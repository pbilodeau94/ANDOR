'use client'

import { type ReactNode } from 'react'

export type BoardColumn<S extends string> = {
  key: S
  label: string
  color: string
}

export default function BoardView<S extends string>({
  columns,
  children,
}: {
  columns: BoardColumn<S>[]
  children: (columnKey: S) => ReactNode
}) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((col) => (
        <div key={col.key} className="w-72 shrink-0">
          <div className={`mb-3 rounded-lg px-3 py-2 text-sm font-semibold ${col.color}`}>
            {col.label}
          </div>
          <div className="space-y-3">
            {children(col.key)}
          </div>
        </div>
      ))}
    </div>
  )
}
