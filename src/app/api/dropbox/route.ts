import { NextRequest, NextResponse } from 'next/server'

const BASE_PATH = '/Autoimmune Neurology Research'

let cachedToken: { token: string; expiresAt: number } | null = null

async function getAccessToken(forceRefresh = false): Promise<string> {
  if (!forceRefresh && cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token
  }

  const appKey = process.env.DROPBOX_APP_KEY
  const appSecret = process.env.DROPBOX_APP_SECRET
  const refreshToken = process.env.DROPBOX_REFRESH_TOKEN

  if (!appKey || !appSecret || !refreshToken) {
    throw new Error('Dropbox credentials not configured')
  }

  const res = await fetch('https://api.dropboxapi.com/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: appKey,
      client_secret: appSecret,
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Token refresh failed: ${text}`)
  }

  const data = await res.json()
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  }

  return cachedToken.token
}

async function dropboxFetch(url: string, body: object, retry = true): Promise<Response> {
  const token = await getAccessToken()
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  // If missing_scope or invalid token, force refresh and retry once
  if (!res.ok && retry) {
    const text = await res.text()
    if (text.includes('missing_scope') || text.includes('expired_access_token') || text.includes('invalid_access_token')) {
      cachedToken = null
      const freshToken = await getAccessToken(true)
      return fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${freshToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
    }
    throw new Error(text)
  }

  return res
}

async function listFolder(path: string) {
  const fullPath = path === '/' ? BASE_PATH : `${BASE_PATH}${path}`

  const res = await dropboxFetch(
    'https://api.dropboxapi.com/2/files/list_folder',
    { path: fullPath, limit: 100 },
  )

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`List folder failed: ${text}`)
  }

  const data = await res.json()
  return data.entries.map((entry: Record<string, unknown>) => ({
    name: entry.name,
    type: entry['.tag'] === 'folder' ? 'folder' : 'file',
    path: (entry.path_display as string).replace(BASE_PATH, '') || '/',
    size: entry.size || 0,
    modified: entry.server_modified || null,
  }))
}

async function getTemporaryLink(path: string) {
  const fullPath = `${BASE_PATH}${path}`

  const res = await dropboxFetch(
    'https://api.dropboxapi.com/2/files/get_temporary_link',
    { path: fullPath },
  )

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Get link failed: ${text}`)
  }

  const data = await res.json()
  return data.link
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')
  const path = searchParams.get('path') || '/'

  try {
    if (action === 'list') {
      const entries = await listFolder(path)
      return NextResponse.json({ entries })
    }

    if (action === 'link') {
      const link = await getTemporaryLink(path)
      return NextResponse.json({ link })
    }

    return NextResponse.json({ error: 'Invalid action. Use ?action=list or ?action=link' }, { status: 400 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
