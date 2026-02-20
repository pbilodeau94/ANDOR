export type Publication = {
  id: string
  title: string
  authors: string
  journal: string
  year: number
  doi?: string
  pmid?: string
  researchGroup: string
}

export const publications: Publication[] = [
  {
    "id": "pub1",
    "title": "A threshold in anti-EBNA-1 antibody titers distinguishes salivary EBV shedders from non-shedders.",
    "authors": "Mahler JV, Bilodeau PA, Anderson M, Mikami T, Bobrowski-Khoury N, Jiang M, Zhu H, Nguyen J, Matiello M, Levy M, Bjornevik K, Drosu N",
    "journal": "J Infect Dis",
    "year": 2026,
    "pmid": "41493209",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub2",
    "title": "Comparative Effectiveness of Disease-Modifying Treatments in Double Seronegative Neuromyelitis Optica Spectrum Disorder.",
    "authors": "Mahler JV, Vallejos GB, Mikami T, Bilodeau PA, Anderson M, Drosu N, Bobrowski-Khoury N, Silva GD, Solti M, Apóstolos-Pereira SL, Callegaro D, Leles Vieira de Souza B, Manzano GS, Vishnevetsky A, Gillani R, Pasquale O, Kim A, Vij R, Kister I, Gibbons EL, Jacob A, Huda S, Said Y, Krett JD, Sotirchos ES, Ramprasad M, Abboud H, Crelier VTC, Dos Santos G, Uawithya E, Siritho S, Sezen A, Altintas A, Gai F, Guo Y, Bhattacharyya S, Levy M, Matiello M",
    "journal": "Neurol Neuroimmunol Neuroinflamm",
    "year": 2026,
    "pmid": "41637688",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub3",
    "title": "Complement Inhibition for Acute Neuromyelitis Optica Spectrum Disorder Attacks: Insights From an International Case Series.",
    "authors": "Rommer PS, Jiang W, Nolte JP, Mikami T, De Seze J, Sánchez P, Harel A, Alkabie S, Kaneko K, Bilodeau PA, Misu T, Kremer L, Bigaut K, Leypoldt F, Aktas O, Ringelstein M, Siffrin V, Zhang LJ, Cong H, Lowe M, Barreras P, Chen H, Piquet AL, Sotirchos ES, Kammeyer R, Zook J, Bennett JL, Berger T, Fujihara K, Levy M, Shi FD, Paul F",
    "journal": "Neurol Neuroimmunol Neuroinflamm",
    "year": 2026,
    "pmid": "41671531",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub4",
    "title": "Early Relapse Risk in Biopsy-Confirmed Primary Central Nervous System Vasculitis.",
    "authors": "Nguyen JV, Bilodeau PA, Mahler JV, Drosu N, Bobrowski-Khoury N, Quinn C, Mikami T, Anderson M, Levy M",
    "journal": "JAMA Neurol",
    "year": 2026,
    "pmid": "41489860",
    "researchGroup": "CNS Vasculitis"
  },
  {
    "id": "pub5",
    "title": "Lack of external validity of the MOG-AR score in a North American cohort.",
    "authors": "Jiang M, Vishnevetsky A, Clark MW, Anderson M, Mikami T, Gillani R, Murillo F, Oliveira JVMF, Salky R, Romanow G, Levy M, Bilodeau PA",
    "journal": "Mult Scler Relat Disord",
    "year": 2026,
    "pmid": "41610623",
    "researchGroup": "MOGAD"
  },
  {
    "id": "pub6",
    "title": "Low prevalence of inflammatory bowel disease among patients with seropositive neuromyelitis optica spectrum disorder in two large referral centers.",
    "authors": "Akers C, Bilodeau PA, Clark MW, Hashemzadeh T, Levy M, Bhattacharyya S, Kister I",
    "journal": "Mult Scler Relat Disord",
    "year": 2026,
    "pmid": "41576642",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub7",
    "title": "Real-World Efficacy and Safety of Neuromyelitis Optica Spectrum Disorder Disease-Modifying Treatments.",
    "authors": "Bilodeau PA, Wruble Clark M, Ganguly A, Harowitz JB, Mahler JV, Jiang M, Narasimhan SS, Pua DK, Healy BC, Mateen FJ, Levy M, Bhattacharyya S",
    "journal": "Neurol Neuroimmunol Neuroinflamm",
    "year": 2026,
    "pmid": "41494145",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub8",
    "title": "A Multi-Center Retrospective Cohort Study of Neurosarcoidosis Myelitis: Current Observations and Future Directions.",
    "authors": "Manzano GS, Balaban D, Zhang Y, Healy B, Chwalisz BK, Levy M, Venna N, Stern BJ, Pardo CA, Barreras P, Rjeily NB, Flanagan EP, Redenbaugh V, Aksamit AJ, Hutto S, Herman M, El Sammak S, Rodriguez EC, Snider L, Rains H, Montalvo M, Rempe T, Ramirez SM, Horta L, Clardy S, Lord J, Cho TA, Abdel Wahed L, Berger JR, Samudralwar RD, Torres NR, Clifford DB, Dunham SR, Majed M, Zabeti A, Marcucci S, Mao-Draayer Y, Doty J, Agyei PB, Bhattacharyya S",
    "journal": "Ann Clin Transl Neurol",
    "year": 2025,
    "pmid": "40963302",
    "researchGroup": "Neurosarcoidosis"
  },
  {
    "id": "pub9",
    "title": "American Academy of Neurology, 2024 Summer Conference, Atlanta, GA",
    "authors": "Wruble, M",
    "journal": "Elevated Neurofilament Light Chain and Oligoclonal Bands as Biomarkers of Autoimmune Encephalitis in Neuropsychiatric Systemic Lupus Erythematosus",
    "year": 2025,
    "researchGroup": "Autoimmune Encephalitis"
  },
  {
    "id": "pub10",
    "title": "Consensus Recommendations for the Management of Neurosarcoidosis: A Delphi Survey of Experts Across the United States.",
    "authors": "Manzano GS, Eaton J, Levy M, Abbatemarco JR, Aksamit AJ, Anand P, Balaban DT, Barreras P, Baughman RP, Bhattacharyya S, Bomprezzi R, Cho TA, Chwalisz B, Clardy SL, Clifford DB, Flanagan EP, Gelfand JM, Harrold GK, Hutto SK, Pawate S, Rivera Torres N, Abdel-Wahed L, Dunham SR, Gupta RK, Moss B, Pardo CA, Samudralwar RD, Venna N, Zabeti A, Kister I",
    "journal": "Neurol Clin Pract",
    "year": 2025,
    "doi": "10.1212/CPJ.0000000000200429",
    "pmid": "39830676",
    "researchGroup": "Neurosarcoidosis"
  },
  {
    "id": "pub11",
    "title": "European Committee for Treatment and Research in Multiple Sclerosis, Annual Congress, Barcelona, Spain",
    "authors": "Wruble Clark, M",
    "journal": "Predictive Value of Billing Codes for Identifying Relapse Hospitalizations in NMOSD",
    "year": 2025,
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub12",
    "title": "European Committee for Treatment and Research in Multiple Sclerosis, Annual Congress, Barcelona, Spain",
    "authors": "Wruble Clark, M",
    "journal": "Predictive Value of Billing Codes for Identifying Relapse Hospitalizations in NMOSD",
    "year": 2025,
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub13",
    "title": "Neuropsychologic impact of MOGAD: A patient reported outcomes study.",
    "authors": "Leles B, Zhang Y, Bilodeau PA, Vishnevetsky A, Mikami T, Anderson M, Gillani R, Wruble Clark M, Salky R, Romanow G, Levy M, Manzano GS",
    "journal": "Mult Scler Relat Disord",
    "year": 2025,
    "pmid": "41421010",
    "researchGroup": "MOGAD"
  },
  {
    "id": "pub14",
    "title": "Potential mechanisms of how B-cell depletion works in MOGAD.",
    "authors": "Bilodeau PA, Yeh A, Lechner-Scott J, Hawkes CH, Giovannoni G, Levy M",
    "journal": "Mult Scler Relat Disord",
    "year": 2025,
    "doi": "10.1016/j.msard.2025.106269",
    "pmid": "39827742",
    "researchGroup": "MOGAD"
  },
  {
    "id": "pub15",
    "title": "Potential mechanisms of how B-cell depletion works in MOGAD.",
    "authors": "Bilodeau PA, Yeh A, Lechner-Scott J, Hawkes CH, Giovannoni G, Levy M",
    "journal": "Mult Scler Relat Disord",
    "year": 2025,
    "doi": "10.1016/j.msard.2025.106269",
    "pmid": "39827742",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub16",
    "title": "Repurposing Licensed Drugs with Activity Against Epstein-Barr Virus for Treatment of Multiple Sclerosis: A Systematic Approach.",
    "authors": "Li V, McKay FC, Tscharke DC, Smith C, Khanna R, Lechner-Scott J, Rawlinson WD, Lloyd AR, Taylor BV, Morahan JM, Steinman L, Giovannoni G, Bar-Or A, Levy M, Drosu N, Potter A, Caswell N, Smith L, Brady EC, Frost B, Hodgkinson S, Hardy TA, Broadley SA, Australian Anti-EBV Drugs for MS Working Group",
    "journal": "CNS Drugs",
    "year": 2025,
    "doi": "10.1007/s40263-024-01153-5",
    "pmid": "39792343",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub17",
    "title": "Safety and efficacy of anti-IL-17A use in multiple sclerosis and comorbid rheumatological disease: A multi-center exploratory study.",
    "authors": "Madill E, Galetta K, Opeyemi O, Pua DK, Gandelman S, Chitnis T, Bhattacharyya S",
    "journal": "J Clin Neurosci",
    "year": 2025,
    "doi": "10.1016/j.jocn.2025.111211",
    "pmid": "40174548",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub18",
    "title": "Urgent Issues in Multiple Sclerosis: A Practical Guide for Non-Neurologists.",
    "authors": "Udawatta M, Matiello M",
    "journal": "Med Clin North Am",
    "year": 2025,
    "doi": "10.1016/j.mcna.2024.10.001",
    "pmid": "39893020",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub19",
    "title": "Validity of model for predicting risk of relapse in MOGAD.",
    "authors": "Jiang M, Bilodeau PA, Healy B, Yeh EA, Giovannoni G, Hawkes C, Lechner-Scott J, Levy M",
    "journal": "Mult Scler Relat Disord",
    "year": 2025,
    "pmid": "41238291",
    "researchGroup": "MOGAD"
  },
  {
    "id": "pub20",
    "title": "A transcutaneous electrical nerve stimulation device for the relief of neuropathic pain in NMOSD: A randomized, double-blind, sham-controlled trial.",
    "authors": "Vishnevetsky A, Romanow G, Levy M",
    "journal": "Mult Scler J Exp Transl Clin",
    "year": 2024,
    "doi": "10.1177/20552173241301018",
    "pmid": "39651334",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub21",
    "title": "An evaluation of ravulizumab for the treatment of neuromyelitis optica spectrum disorder.",
    "authors": "Balaban DT, Levy M, Borrow R, Anderson MR",
    "journal": "Expert Opin Biol Ther",
    "year": 2024,
    "doi": "10.1080/14712598.2024.2423002",
    "pmid": "39460545",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub22",
    "title": "Anti-aquaporin-4 immune complex stimulates complement-dependent Th17 cytokine release in neuromyelitis optica spectrum disorders.",
    "authors": "Nishiyama S, Seok JM, Wright AE, Lotan I, Mikami T, Drosu NC, Bobrowski-Khoury N, Anderson MR, Bilodeau PA, Schindler P, Paul F, Aoki M, Yeaman MR, Levy M, Guthy-Jackson Charitable Foundation CIRCLES Study Group",
    "journal": "Sci Rep",
    "year": 2024,
    "doi": "10.1038/s41598-024-53661-5",
    "pmid": "38326464",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub23",
    "title": "Assessment of international MOGAD diagnostic criteria in patients with overlapping MOG-associated disease and multiple sclerosis phenotypes.",
    "authors": "Manzano GS, Levy M, Salky R, Mateen FJ, Klawiter EC, Chitnis T, Vasileiou ES, Sotirchos ES, Gibbons E, Huda S, Jacob A, Matiello M",
    "journal": "J Neurol",
    "year": 2024,
    "doi": "10.1007/s00415-024-12585-w",
    "pmid": "39066792",
    "researchGroup": "MOGAD"
  },
  {
    "id": "pub24",
    "title": "Assessment of international MOGAD diagnostic criteria in patients with overlapping MOG-associated disease and multiple sclerosis phenotypes.",
    "authors": "Manzano GS, Levy M, Salky R, Mateen FJ, Klawiter EC, Chitnis T, Vasileiou ES, Sotirchos ES, Gibbons E, Huda S, Jacob A, Matiello M",
    "journal": "J Neurol",
    "year": 2024,
    "doi": "10.1007/s00415-024-12585-w",
    "pmid": "39066792",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub25",
    "title": "Association of HLA-DRB1*15:01 Status with Transcriptomic Pattern of B cells in CSF in Multiple Sclerosis (P7-6.011).",
    "authors": "Mikami T, Levy M",
    "journal": "Neurology",
    "year": 2024,
    "doi": "10.1212/WNL.0000000000208131",
    "pmid": "39977876",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub26",
    "title": "CD4 T cells restricted to DRB1*15:01 recognize two Epstein-Barr virus glycoproteins capable of intracellular antigen presentation.",
    "authors": "Drosu N, Anderson M, Bilodeau PA, Nishiyama S, Mikami T, Bobrowski-Khoury N, Cabot J, Housman D, Levy M",
    "journal": "Proc Natl Acad Sci U S A",
    "year": 2024,
    "doi": "10.1073/pnas.2416097121",
    "pmid": "39432795",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub27",
    "title": "Coeliac disease as a model for understanding multiple sclerosis.",
    "authors": "Drosu N, Bjornevik K, Cortese M, Levy M, Sollid LM",
    "journal": "Nat Rev Neurol",
    "year": 2024,
    "doi": "10.1038/s41582-024-01025-y",
    "pmid": "39379493",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub28",
    "title": "Disease modifying therapy in the treatment of tumefactive multiple sclerosis: A retrospective cohort study.",
    "authors": "Galetta K, Ham AS, Vishnevetsky A, Bhattacharyya S, Mateen FJ",
    "journal": "J Neuroimmunol",
    "year": 2024,
    "doi": "10.1016/j.jneuroim.2024.578299",
    "pmid": "38364529",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub29",
    "title": "Effectiveness of immunotherapies in relapsing myelin oligodendrocyte glycoprotein antibody-associated disease.",
    "authors": "Bilodeau PA, Vishnevetsky A, Molazadeh N, Lotan I, Anderson M, Romanow G, Salky R, Healy BC, Matiello M, Chitnis T, Levy M",
    "journal": "Mult Scler",
    "year": 2024,
    "doi": "10.1177/13524585241226830",
    "pmid": "38314479",
    "researchGroup": "MOGAD"
  },
  {
    "id": "pub30",
    "title": "Extra-Limbic Seronegative Encephalitis Preceding Recurrent Hodgkin's Lymphoma and Gastric Diffuse Large B-Cell Lymphoma: A Case Report.",
    "authors": "Li C, Fisher D, Bhattacharyya S",
    "journal": "Neurohospitalist",
    "year": 2024,
    "doi": "10.1177/19418744241265393",
    "pmid": "39308461",
    "researchGroup": "Autoimmune Encephalitis"
  },
  {
    "id": "pub31",
    "title": "Extra-Limbic Seronegative Encephalitis Preceding Recurrent Hodgkin's Lymphoma and Gastric Diffuse Large B-Cell Lymphoma: A Case Report.",
    "authors": "Li C, Fisher D, Bhattacharyya S",
    "journal": "Neurohospitalist",
    "year": 2024,
    "doi": "10.1177/19418744241265393",
    "pmid": "39308461",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub32",
    "title": "Herpes Simplex Virus Encephalitis in Patients With Autoimmune Conditions or Exposure to Immunomodulatory Medications.",
    "authors": "Tang A, Yoshida K, Lahey H, Wilcox DR, Guan H, Costenbader K, Solomon D, Miyawaki EK, Bhattacharyya S",
    "journal": "Neurology",
    "year": 2024,
    "doi": "10.1212/WNL.0000000000209297",
    "pmid": "38696733",
    "researchGroup": "Autoimmune Encephalitis"
  },
  {
    "id": "pub33",
    "title": "In the era of antiviral trials for MS, the answer lies in the details.",
    "authors": "Drosu N, Bjornevik K, Bilodeau PA, Yeh A, Lechner-Scott J, Hawkes CH, Giovannoni G, Levy M",
    "journal": "Mult Scler Relat Disord",
    "year": 2024,
    "doi": "10.1016/j.msard.2024.105444",
    "pmid": "38241758",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub34",
    "title": "Long-term MRI and clinical stability in an HIV-positive patient with multiple sclerosis on tenofovir: A case report.",
    "authors": "Drosu N, Bjornevik K, Bilodeau P, Levy M",
    "journal": "Mult Scler Relat Disord",
    "year": 2024,
    "doi": "10.1016/j.msard.2023.105397",
    "pmid": "38246000",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub35",
    "title": "Mr. Machiavelli's Choice for Treatment of MOG Antibody Disease: Do the benefits of long-term corticosteroids justify the means?",
    "authors": "Levy M, Yeh A, Hawkes C, Lechner-Scott J, Giovannoni G",
    "journal": "Machiavelli's Choice for Treatment of MOG Antibody Disease: Do the benefits of long-term corticosteroids justify the means? Mult Scler Relat Disord",
    "year": 2024,
    "doi": "10.1016/j.msard.2024.105794",
    "pmid": "39111225",
    "researchGroup": "MOGAD"
  },
  {
    "id": "pub36",
    "title": "Neurologic Outcomes in People With Multiple Sclerosis Treated With Immune Checkpoint Inhibitors for Oncologic Indications.",
    "authors": "Quinn CM, Rajarajan P, Gill AJ, Kopinsky H, Wolf AB, de Camargo CS, Lamb J, Bacon TE, Murray JC, Probasco JC, Galetta KM, Kantor D, Coyle P, Bhise V, Alvarez E, Conway SE, Bhattacharyya S, Kister I",
    "journal": "Neurology",
    "year": 2024,
    "doi": "10.1212/WNL.0000000000210003",
    "pmid": "39541548",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub37",
    "title": "Predictors of relapsing disease course following index event in myelin oligodendrocyte glycoprotein antibody-associated disease (MOGAD).",
    "authors": "Molazadeh N, Bilodeau PA, Salky R, Bose G, Lotan I, Romanow G, Anderson MR, Matiello M, Chitnis T, Levy M",
    "journal": "J Neurol Sci",
    "year": 2024,
    "doi": "10.1016/j.jns.2024.122909",
    "pmid": "38335710",
    "researchGroup": "MOGAD"
  },
  {
    "id": "pub38",
    "title": "Radiologic and clinical stability in an HIV-negative MS patient after tenofovir: An updated case report.",
    "authors": "Drosu N, Levy M",
    "journal": "Mult Scler Relat Disord",
    "year": 2024,
    "doi": "10.1016/j.msard.2023.105396",
    "pmid": "38245999",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub39",
    "title": "Stroke associated with sarcoidosis: A systematic review of reported cases.",
    "authors": "Pua DKA, Anand P, Bhattacharyya S",
    "journal": "J Neurol Sci",
    "year": 2024,
    "doi": "10.1016/j.jns.2024.123080",
    "pmid": "38850770",
    "researchGroup": "Neurosarcoidosis"
  },
  {
    "id": "pub40",
    "title": "Characteristics of Progressive Multifocal Leukoencephalopathy Associated With Sarcoidosis Without Therapeutic Immune Suppression.",
    "authors": "McEntire CRS, Fletcher A, Toledano M, Epstein S, White E, Tan CS, Mao-Draayer Y, Banks SA, Aksamit AJ, Gelfand JM, Thakur KT, Anand P, Cortese I, Bhattacharyya S",
    "journal": "JAMA Neurol",
    "year": 2023,
    "doi": "10.1001/jamaneurol.2023.0841",
    "pmid": "37093609",
    "researchGroup": "Neurosarcoidosis"
  },
  {
    "id": "pub41",
    "title": "Combined Drainage and Protocolized Necrosectomy Through a Coaxial Lumen-apposing Metal Stent for Pancreatic Walled-off Necrosis: A Prospective Multicenter Trial.",
    "authors": "Dayyeh BKA, Chandrasekhara V, Shah RJ, Easler JJ, Storm AC, Topazian M, Levy MJ, Martin JA, Petersen BT, Takahashi N, Edmundowicz S, Hammad H, Wagh MS, Wani S, DeWitt J, Bick B, Gromski M, Al Haddad M, Sherman S, Merchant AA, Peetermans JA, Gjata O, McMullen E, Willingham FF",
    "journal": "Ann Surg",
    "year": 2023,
    "doi": "10.1097/SLA.0000000000005274",
    "pmid": "35129503",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub42",
    "title": "Editorial: MOGAD, current knowledge and future trends.",
    "authors": "Siritho S, Pandit L, Matiello M",
    "journal": "Front Neurol",
    "year": 2023,
    "doi": "10.3389/fneur.2023.1283217",
    "pmid": "37840927",
    "researchGroup": "MOGAD"
  },
  {
    "id": "pub43",
    "title": "Hypogammaglobulinemia secondary to B-cell depleting therapies in neuroimmunology: Comparing management strategies.",
    "authors": "Kelly H, Vishnevetsky A, Chibnik LB, Levy M",
    "journal": "Mult Scler J Exp Transl Clin",
    "year": 2023,
    "doi": "10.1177/20552173231182534",
    "pmid": "37377746",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub44",
    "title": "Low mortality rate in a large cohort of myelin oligodendrocyte glycoprotein antibody disease (MOGAD).",
    "authors": "Lotan I, Romanow G, Salky R, Molazadeh N, Vishnevetsky A, Anderson M, Bilodeau PA, Cutter G, Levy M",
    "journal": "Ann Clin Transl Neurol",
    "year": 2023,
    "doi": "10.1002/acn3.51750",
    "pmid": "36852731",
    "researchGroup": "MOGAD"
  },
  {
    "id": "pub45",
    "title": "Multiple types of relapses in MOG antibody disease.",
    "authors": "Levy M, Molazadeh N, Bilodeau PA, Vishnevetsky A, Lotan I, Salky R, Anderson M, Romanow G, Lechner-Scott J, Yeh EA, Giovannoni G",
    "journal": "Mult Scler Relat Disord",
    "year": 2023,
    "doi": "10.1016/j.msard.2023.104613",
    "pmid": "36931080",
    "researchGroup": "MOGAD"
  },
  {
    "id": "pub46",
    "title": "Preserved T cell but attenuated antibody response in MS patients on fingolimod and ocrelizumab following 2nd and 3rd SARS-CoV-2 mRNA vaccine.",
    "authors": "Conway S, Saxena S, Baecher-Allan C, Krishnan R, Houtchens M, Glanz B, Saraceno TJ, Polgar-Turcsanyi M, Bose G, Bakshi R, Bhattacharyya S, Galetta K, Kaplan T, Severson C, Singhal T, Stazzone L, Zurawski J, Paul A, Weiner HL, Healy BC, Chitnis T",
    "journal": "Mult Scler J Exp Transl Clin",
    "year": 2023,
    "doi": "10.1177/20552173231165196",
    "pmid": "37057191",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub47",
    "title": "Quantifying the economic burden to patients of relapse events from neuromyelitis optica spectrum disorders: A cross-sectional survey.",
    "authors": "Rice DR, Holroyd KB, Pua DK, Levy M, Mateen FJ, Bhattacharyya S",
    "journal": "Mult Scler Relat Disord",
    "year": 2023,
    "doi": "10.1016/j.msard.2023.104580",
    "pmid": "36805175",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub48",
    "title": "Rash, Facial Droop, and Multifocal Intracranial Stenosis Due to Varicella Zoster Virus Vasculitis.",
    "authors": "Bilodeau PA, Aghajan Y, Izzy S",
    "journal": "Neurohospitalist",
    "year": 2023,
    "doi": "10.1177/19418744221150301",
    "pmid": "37064929",
    "researchGroup": "CNS Vasculitis"
  },
  {
    "id": "pub49",
    "title": "Anti-SARS-CoV-2 monoclonal antibodies for the treatment of active COVID-19 in multiple sclerosis: An observational study.",
    "authors": "Manzano GS, Rice DR, Klawiter EC, Matiello M, Gillani RL, Tauhid SS, Bakshi R, Mateen FJ",
    "journal": "Mult Scler",
    "year": 2022,
    "doi": "10.1177/13524585221092309",
    "pmid": "35475382",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub50",
    "title": "Clinical and radiologic outcomes in two patients with multiple sclerosis treated with tocilizumab for COVID-19",
    "authors": "Holroyd KB, Conway SE, Bhattacharyya S, Galetta K",
    "journal": "Neuroimmunology Reports",
    "year": 2022,
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub51",
    "title": "Correction to: Role of complement and potential of complement inhibitors in myasthenia gravis and neuromyelitis optica spectrum disorders: a brief review.",
    "authors": "Chamberlain JL, Huda S, Whittam DH, Matiello M, Morgan BP, Jacob A",
    "journal": "J Neurol",
    "year": 2022,
    "doi": "10.1007/s00415-021-10896-w",
    "pmid": "34779891",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub52",
    "title": "Cortical and Subcortical Dysmetabolism Are Dynamic Markers of Clinical Disability and Course in Anti-LGI1 Encephalitis.",
    "authors": "Rissanen E, Carter K, Cicero S, Ficke J, Kijewski M, Park MA, Kijewski J, Stern E, Chitnis T, Silbersweig D, Weiner HL, Kim CK, Lyons J, Klein JP, Bhattacharyya S, Singhal T",
    "journal": "Neurol Neuroimmunol Neuroinflamm",
    "year": 2022,
    "doi": "10.1212/NXI.0000000000001136",
    "pmid": "35091466",
    "researchGroup": "Autoimmune Encephalitis"
  },
  {
    "id": "pub53",
    "title": "Disease modifying therapy management of multiple sclerosis after stem cell therapies: A retrospective case series.",
    "authors": "Manzano GS, Holroyd KB, Kaplan T, Bhattacharyya S, Chitnis T, Hotan G, Zurawski J, Galetta KM, Mateen FJ",
    "journal": "Mult Scler Relat Disord",
    "year": 2022,
    "doi": "10.1016/j.msard.2022.103861",
    "pmid": "35576727",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub54",
    "title": "EBV as the \"gluten of MS\" hypothesis provides a rationale for trialing antiviral therapies.",
    "authors": "Drosu N, Giovannoni G, Lechner-Scott J, Hawkes C, Yeh A, Levy M",
    "journal": "Mult Scler Relat Disord",
    "year": 2022,
    "doi": "10.1016/j.msard.2022.104007",
    "pmid": "35803161",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub55",
    "title": "Extended B-cell depletion beyond 6-months in patients receiving ocrelizumab or rituximab for CNS demyelinating disease.",
    "authors": "AbdelRazek MA, Casasola M, Mollashahi R, Brodski A, Morin S, Augustynowicz A, Jassim S, Matiello M, Sloane J",
    "journal": "Mult Scler Relat Disord",
    "year": 2022,
    "doi": "10.1016/j.msard.2022.103505",
    "pmid": "35121247",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub56",
    "title": "Humoral response to COVID-19 vaccination in MS patients on disease modifying therapy: Immune profiles and clinical outcomes.",
    "authors": "Holroyd KB, Healy BC, Conway S, Houtchens M, Bakshi R, Bhattacharyya S, Bose G, Galetta K, Kaplan T, Severson C, Singhal T, Stazzone L, Zurawski J, Polgar-Turcsanyi M, Saxena S, Paul A, Glanz BI, Weiner HL, Chitnis T",
    "journal": "Mult Scler Relat Disord",
    "year": 2022,
    "doi": "10.1016/j.msard.2022.104079",
    "pmid": "35952457",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub57",
    "title": "Implications of Low-Titer MOG Antibodies.",
    "authors": "Levy M, Yeh EA, Hawkes CH, Lechner-Scott J, Giovannoni G",
    "journal": "Mult Scler Relat Disord",
    "year": 2022,
    "doi": "10.1016/j.msard.2022.103746",
    "pmid": "35320765",
    "researchGroup": "MOGAD"
  },
  {
    "id": "pub58",
    "title": "Neurologic disease activity in people with multiple sclerosis treated with immune checkpoint inhibitors.",
    "authors": "Conway SE, Pua DKA, Holroyd KB, Galetta K, Bhattacharyya S",
    "journal": "Mult Scler",
    "year": 2022,
    "doi": "10.1177/13524585221117949",
    "pmid": "35957594",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub59",
    "title": "Positive Predictive Value of MOG-IgG for Clinically Defined MOG-AD Within a Real-World Cohort.",
    "authors": "Manzano GS, Salky R, Mateen FJ, Klawiter EC, Chitnis T, Levy M, Matiello M",
    "journal": "Front Neurol",
    "year": 2022,
    "doi": "10.3389/fneur.2022.947630",
    "pmid": "35795797",
    "researchGroup": "MOGAD"
  },
  {
    "id": "pub60",
    "title": "Transitioning immunotherapy in neuromyelitis optica spectrum disorder - when and how to switch.",
    "authors": "Vishnevetsky A, Kaplan TB, Levy M",
    "journal": "Expert Opin Biol Ther",
    "year": 2022,
    "doi": "10.1080/14712598.2022.2145879",
    "pmid": "36369948",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub61",
    "title": "Upregulated complement receptors correlate with Fc gamma receptor 3A-positive natural killer and natural killer-T cells in neuromyelitis optica spectrum disorder.",
    "authors": "Nishiyama S, Wright AE, Lotan I, Mikami T, Paul F, Aoki M, Levy M",
    "journal": "J Neuroinflammation",
    "year": 2022,
    "doi": "10.1186/s12974-022-02661-1",
    "pmid": "36503481",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub62",
    "title": "Upregulated complement receptors correlate with Fc gamma receptor 3A-positive natural killer and natural killer-T cells in neuromyelitis optica spectrum disorder.",
    "authors": "Nishiyama S, Wright AE, Lotan I, Mikami T, Paul F, Aoki M, Levy M",
    "journal": "J Neuroinflammation",
    "year": 2022,
    "doi": "10.1186/s12974-022-02661-1",
    "pmid": "36503481",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub63",
    "title": "ACR Appropriateness Criteria® Suspected Spine Infection.",
    "authors": "Expert Panel on Neurological Imaging, Ortiz AO, Levitt A, Shah LM, Parsons MS, Agarwal V, Baldwin K, Bhattacharyya S, Boulter DJ, Burns J, Fink KR, Hunt CH, Hutchins TA, Kao LS, Khan MA, Lo BM, Moritani T, Reitman C, Repplinger MD, Shah VN, Singh S, Timpone VM, Corey AS",
    "journal": "J Am Coll Radiol",
    "year": 2021,
    "doi": "10.1016/j.jacr.2021.09.001",
    "pmid": "34794603",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub64",
    "title": "ASC-dependent inflammasomes contribute to immunopathology and mortality in herpes simplex encephalitis.",
    "authors": "Hayes CK, Wilcox DR, Yang Y, Coleman GK, Brown MA, Longnecker R",
    "journal": "PLoS Pathog",
    "year": 2021,
    "pmid": "33524073",
    "researchGroup": "Autoimmune Encephalitis"
  },
  {
    "id": "pub65",
    "title": "Autoimmune encephalitis: proposed best practice recommendations for diagnosis and acute management.",
    "authors": "Abboud H, Probasco JC, Irani S, Ances B, Benavides DR, Bradshaw M, Christo PP, Dale RC, Fernandez-Fournier M, Flanagan EP, Gadoth A, George P, Grebenciucova E, Jammoul A, Lee ST, Li Y, Matiello M, Morse AM, Rae-Grant A, Rojas G, Rossman I, Schmitt S, Venkatesan A, Vernino S, Pittock SJ, Titulaer MJ, Autoimmune Encephalitis Alliance Clinicians Network",
    "journal": "J Neurol Neurosurg Psychiatry",
    "year": 2021,
    "doi": "10.1136/jnnp-2020-325300",
    "pmid": "33649022",
    "researchGroup": "Autoimmune Encephalitis"
  },
  {
    "id": "pub66",
    "title": "Autoimmune encephalitis: proposed recommendations for symptomatic and long-term management.",
    "authors": "Abboud H, Probasco J, Irani SR, Ances B, Benavides DR, Bradshaw M, Christo PP, Dale RC, Fernandez-Fournier M, Flanagan EP, Gadoth A, George P, Grebenciucova E, Jammoul A, Lee ST, Li Y, Matiello M, Morse AM, Rae-Grant A, Rojas G, Rossman I, Schmitt S, Venkatesan A, Vernino S, Pittock SJ, Titulaer M, Autoimmune Encephalitis Alliance Clinicians Network",
    "journal": "J Neurol Neurosurg Psychiatry",
    "year": 2021,
    "doi": "10.1136/jnnp-2020-325302",
    "pmid": "33649021",
    "researchGroup": "Autoimmune Encephalitis"
  },
  {
    "id": "pub67",
    "title": "B cell therapy and the use of RNA-based COVID-19 vaccines.",
    "authors": "Vishnevetsky A, Hawkes C, Lechner-Scott J, Giovannoni G, Levy M, Pohl D",
    "journal": "Mult Scler Relat Disord",
    "year": 2021,
    "pmid": "33883063",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub68",
    "title": "Correction to: Role of complement and potential of complement inhibitors in myasthenia gravis and neuromyelitis optica spectrum disorders: a brief review.",
    "authors": "Chamberlain JL, Huda S, Whittam DH, Matiello M, Morgan BP, Jacob A",
    "journal": "J Neurol",
    "year": 2021,
    "doi": "10.1007/s00415-019-09568-7",
    "pmid": "31624952",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub69",
    "title": "Electronic pill bottles to monitor and promote medication adherence for people with multiple sclerosis: A randomized, virtual clinical trial.",
    "authors": "Rice DR, Kaplan TB, Hotan GC, Vogel AC, Matiello M, Gillani RL, Hutto SK, Ham AS, Klawiter EC, George IC, Galetta K, Mateen FJ",
    "journal": "J Neurol Sci",
    "year": 2021,
    "doi": "10.1016/j.jns.2021.117612",
    "pmid": "34392138",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub70",
    "title": "Neuromyelitis Optica Spectrum Disorder: Clinical Burden and Cost of Relapses and Disease-Related Care in US Clinical Practice.",
    "authors": "Royston M, Kielhorn A, Weycker D, Shaff M, Houde L, Tanvir I, Bhattacharyya S, Levy M",
    "journal": "Neurol Ther",
    "year": 2021,
    "doi": "10.1007/s40120-021-00253-4",
    "pmid": "34046846",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub71",
    "title": "Probing the association between Multiple Sclerosis and Epstein Barr Virus from a therapeutic perspective.",
    "authors": "Drosu N, Giovannoni G, Pohl D, Hawkes C, Lechner-Scott J, Levy M",
    "journal": "Mult Scler Relat Disord",
    "year": 2021,
    "doi": "10.1016/j.msard.2021.103087",
    "pmid": "34139660",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub72",
    "title": "Quantifying the relationship between disability progression and quality of life in patients treated for NMOSD: Insights from the SAkura studies.",
    "authors": "Levy M, Haycox AR, Becker U, Costantino C, Damonte E, Klingelschmitt G, von Büdingen HC, Wallenstein G, Maio DD, Szczechowski L",
    "journal": "Mult Scler Relat Disord",
    "year": 2021,
    "doi": "10.1016/j.msard.2021.103332",
    "pmid": "35158426",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub73",
    "title": "Symptomatic and restorative therapies in neuromyelitis optica spectrum disorders.",
    "authors": "Abboud H, Salazar-Camelo A, George N, Planchon SM, Matiello M, Mealy MA, Goodman A, On-behalf of the Guthy-Jackson Foundation NMO International Clinical Consortium",
    "journal": "J Neurol",
    "year": 2021,
    "doi": "10.1007/s00415-021-10783-4",
    "pmid": "34482456",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub74",
    "title": "Teaching NeuroImage: Bilateral Middle Cerebellar Peduncle Stroke in Giant Cell Arteritis.",
    "authors": "Aghajan Y, Mitchell RN, Bhattacharyya S, Hsu TY, Klein JP",
    "journal": "Neurology",
    "year": 2021,
    "doi": "10.1212/WNL.0000000000012953",
    "pmid": "34667081",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub75",
    "title": "The Astrocyte Type I Interferon Response Is Essential for Protection against Herpes Simplex Encephalitis.",
    "authors": "Hayes CK, Giraldo D, Wilcox DR, Longnecker R",
    "journal": "J Virol",
    "year": 2021,
    "doi": "10.1128/JVI.01783-21",
    "pmid": "34878914",
    "researchGroup": "Autoimmune Encephalitis"
  },
  {
    "id": "pub76",
    "title": "Unilateral Relapsing Primary Angiitis of the CNS: An Entity Suggesting Differences in the Immune Response Between the Cerebral Hemispheres.",
    "authors": "AbdelRazek MA, Hillis JM, Guo Y, Martinez-Lage M, Gholipour T, Sloane J, Cho T, Matiello M",
    "journal": "Neurol Neuroimmunol Neuroinflamm",
    "year": 2021,
    "pmid": "33402525",
    "researchGroup": "CNS Vasculitis"
  },
  {
    "id": "pub77",
    "title": "\"Rocking the boat\" with a new drug for neuromyelitis optica spectrum disorder.",
    "authors": "Levy M, Lechner-Scott J, Hawkes C, Giovannoni G",
    "journal": "Mult Scler Relat Disord",
    "year": 2020,
    "pmid": "33303201",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub78",
    "title": "A Case of Bilaterally Synchronized Faciobrachial Dystonic Seizures in Anti-Leucine-Rich Glioma Inactivated-1 Encephalitis.",
    "authors": "Mikami T, Amano E, Iizuka T, Machida A",
    "journal": "Mov Disord Clin Pract",
    "year": 2020,
    "doi": "10.1002/mdc3.12934",
    "pmid": "32373669",
    "researchGroup": "Autoimmune Encephalitis"
  },
  {
    "id": "pub79",
    "title": "Eastern equine encephalitis and use of IV immunoglobulin therapy and high-dose steroids.",
    "authors": "Wilcox DR, Collens SI, Solomon IH, Mateen FJ, Mukerji SS",
    "journal": "Neurol Neuroimmunol Neuroinflamm",
    "year": 2020,
    "doi": "10.1212/NXI.0000000000000917",
    "pmid": "33172962",
    "researchGroup": "Autoimmune Encephalitis"
  },
  {
    "id": "pub80",
    "title": "Interleukin-6 receptor blockade for the treatment of NMOSD.",
    "authors": "Levy M",
    "journal": "Lancet Neurol",
    "year": 2020,
    "pmid": "32333886",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub81",
    "title": "New therapies for neuromyelitis optica spectrum disorder.",
    "authors": "Levy M, Fujihara K, Palace J",
    "journal": "Lancet Neurol",
    "year": 2020,
    "pmid": "33186537",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub82",
    "title": "Tenofovir prodrugs potently inhibit Epstein-Barr virus lytic DNA replication by targeting the viral DNA polymerase.",
    "authors": "Drosu NC, Edelman ER, Housman DE",
    "journal": "Proc Natl Acad Sci U S A",
    "year": 2020,
    "doi": "10.1073/pnas.2002392117",
    "pmid": "32409608",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub83",
    "title": "Treatment of MOG-IgG-associated disorder with rituximab: An international study of 121 patients.",
    "authors": "Whittam DH, Cobo-Calvo A, Lopez-Chiriboga AS, Pardo S, Gornall M, Cicconi S, Brandt A, Berek K, Berger T, Jelcic I, Gombolay G, Oliveira LM, Callegaro D, Kaneko K, Misu T, Capobianco M, Gibbons E, Karthikeayan V, Brochet B, Audoin B, Mathey G, Laplaud D, Thouvenot E, Cohen M, Tourbah A, Maillart E, Ciron J, Deschamps R, Biotti D, Rostasy K, Neuteboom R, Hemingway C, Forsyth R, Matiello M, Webb S, Hunt D, Murray K, Hacohen Y, Lim M, Leite MI, Palace J, Solomon T, Lutterotti A, Fujihara K, Nakashima I, Bennett JL, Pandit L, Chitnis T, Weinshenker BG, Wildemann B, Sato DK, Kim SH, Huda S, Kim HJ, Reindl M, Levy M, Jarius S, Tenembaum S, Paul F, Pittock S, Marignier R, Jacob A",
    "journal": "Mult Scler Relat Disord",
    "year": 2020,
    "doi": "10.1016/j.msard.2020.102251",
    "pmid": "32629363",
    "researchGroup": "MOGAD"
  },
  {
    "id": "pub84",
    "title": "A pilot safety study of ublituximab, a monoclonal antibody against CD20, in acute relapses of neuromyelitis optica spectrum disorder.",
    "authors": "Mealy MA, Levy M",
    "journal": "Medicine (Baltimore)",
    "year": 2019,
    "doi": "10.1097/MD.0000000000015944",
    "pmid": "31232925",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub85",
    "title": "Aquaporin-4 IgG seropositivity is associated with worse visual outcomes after optic neuritis than MOG-IgG seropositivity and multiple sclerosis, independent of macular ganglion cell layer thinning.",
    "authors": "Sotirchos ES, Filippatou A, Fitzgerald KC, Salama S, Pardo S, Wang J, Ogbuokiri E, Cowley NJ, Pellegrini N, Murphy OC, Mealy MA, Prince JL, Levy M, Calabresi PA, Saidha S",
    "journal": "Mult Scler",
    "year": 2019,
    "doi": "10.1177/1352458519864928",
    "pmid": "31364464",
    "researchGroup": "MOGAD"
  },
  {
    "id": "pub86",
    "title": "Aquaporin-4 IgG seropositivity is associated with worse visual outcomes after optic neuritis than MOG-IgG seropositivity and multiple sclerosis, independent of macular ganglion cell layer thinning.",
    "authors": "Sotirchos ES, Filippatou A, Fitzgerald KC, Salama S, Pardo S, Wang J, Ogbuokiri E, Cowley NJ, Pellegrini N, Murphy OC, Mealy MA, Prince JL, Levy M, Calabresi PA, Saidha S",
    "journal": "Mult Scler",
    "year": 2019,
    "doi": "10.1177/1352458519864928",
    "pmid": "31364464",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub87",
    "title": "Aquaporin-4 IgG seropositivity is associated with worse visual outcomes after optic neuritis than MOG-IgG seropositivity and multiple sclerosis, independent of macular ganglion cell layer thinning.",
    "authors": "Sotirchos ES, Filippatou A, Fitzgerald KC, Salama S, Pardo S, Wang J, Ogbuokiri E, Cowley NJ, Pellegrini N, Murphy OC, Mealy MA, Prince JL, Levy M, Calabresi PA, Saidha S",
    "journal": "Mult Scler",
    "year": 2019,
    "doi": "10.1177/1352458519864928",
    "pmid": "31364464",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub88",
    "title": "Assessing the risk of multiple sclerosis disease-modifying therapies.",
    "authors": "Ayrignac X, Bilodeau PA, Prat A, Girard M, Labauge P, Le Lorier J, Larochelle C, Duquette P",
    "journal": "Expert Rev Neurother",
    "year": 2019,
    "doi": "10.1080/14737175.2019.1627201",
    "pmid": "31195842",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub89",
    "title": "Assessment of Patients with Neuromyelitis Optica Spectrum Disorder Using the EQ-5D.",
    "authors": "Mealy MA, Boscoe A, Caro J, Levy M",
    "journal": "Int J MS Care",
    "year": 2019,
    "doi": "10.7224/1537-2073.2017-076",
    "pmid": "31191178",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub90",
    "title": "Assessment of Patients with Neuromyelitis Optica Spectrum Disorder Using the EQ-5D.",
    "authors": "Mealy MA, Boscoe A, Caro J, Levy M",
    "journal": "Int J MS Care",
    "year": 2019,
    "doi": "10.7224/1537-2073.2017-076",
    "pmid": "31191178",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub91",
    "title": "Autoantibodies in neuropsychiatric lupus: still looking.",
    "authors": "Bhattacharyya S",
    "journal": "Rheumatology (Oxford)",
    "year": 2019,
    "doi": "10.1093/rheumatology/key354",
    "pmid": "30597117",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub92",
    "title": "Brain MRI Findings in Pediatric-Onset Neuromyelitis Optica Spectrum Disorder: Challenges in Differentiation from Acute Disseminated Encephalomyelitis.",
    "authors": "Bulut E, Karakaya J, Salama S, Levy M, Huisman TAGM, Izbudak I",
    "journal": "AJNR Am J Neuroradiol",
    "year": 2019,
    "doi": "10.3174/ajnr.A6003",
    "pmid": "30846436",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub93",
    "title": "Case Report: Scrambler Therapy for Treatment-Resistant Central Neuropathic Pain in a Patient with Transverse Myelitis.",
    "authors": "Mealy MA, Newsome SD, Kozachik SL, Levy M, Smith TJ",
    "journal": "Int J MS Care",
    "year": 2019,
    "doi": "10.7224/1537-2073.2017-083",
    "pmid": "31049038",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub94",
    "title": "Clinical characteristics of myelin oligodendrocyte glycoprotein antibody neuromyelitis optica spectrum disorder.",
    "authors": "Salama S, Pardo S, Levy M",
    "journal": "Mult Scler Relat Disord",
    "year": 2019,
    "pmid": "30825703",
    "researchGroup": "MOGAD"
  },
  {
    "id": "pub95",
    "title": "Clinical characteristics of myelin oligodendrocyte glycoprotein antibody neuromyelitis optica spectrum disorder.",
    "authors": "Salama S, Pardo S, Levy M",
    "journal": "Mult Scler Relat Disord",
    "year": 2019,
    "pmid": "30825703",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub96",
    "title": "Collaborative International Research in Clinical and Longitudinal Experience Study in NMOSD.",
    "authors": "Cook LJ, Rose JW, Alvey JS, Jolley AM, Kuhn R, Marron B, Pederson M, Enriquez R, Yearley J, McKechnie S, Han MH, Tomczak AJ, Levy M, Mealy MA, Coleman J, Bennett JL, Johnson R, Barnes-Garcia M, Traboulsee AL, Carruthers RL, Lee LE, Schubert JJ, McMullen K, Kister I, Rimler Z, Reid A, Sicotte NL, Planchon SM, Cohen JA, Ivancic D, Sedlak JL, Sand IK, Repovic P, Amezcua L, Pruitt A, Amundson E, Chitnis T, Mullin DS, Klawiter EC, Russo AW, Riley CS, Onomichi KB, Levine L, Nelson KE, Nealon NM, Engel C, Kruse-Hoyer M, Marcille M, Tornes L, Rumpf A, Greer A, Kenneally Behne M, Rodriguez RR, Behne DW, Blackway DW, Coords B, Blaschke TF, Sheard J, Smith TJ, Behne JM, Yeaman MR, Guthy-Jackson Charitable Foundation International Clinical Consortium (GJCF–ICC)",
    "journal": "Neurol Neuroimmunol Neuroinflamm",
    "year": 2019,
    "doi": "10.1212/NXI.0000000000000583",
    "pmid": "31355319",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub97",
    "title": "Collaborative International Research in Clinical and Longitudinal Experience Study in NMOSD.",
    "authors": "Cook LJ, Rose JW, Alvey JS, Jolley AM, Kuhn R, Marron B, Pederson M, Enriquez R, Yearley J, McKechnie S, Han MH, Tomczak AJ, Levy M, Mealy MA, Coleman J, Bennett JL, Johnson R, Barnes-Garcia M, Traboulsee AL, Carruthers RL, Lee LE, Schubert JJ, McMullen K, Kister I, Rimler Z, Reid A, Sicotte NL, Planchon SM, Cohen JA, Ivancic D, Sedlak JL, Sand IK, Repovic P, Amezcua L, Pruitt A, Amundson E, Chitnis T, Mullin DS, Klawiter EC, Russo AW, Riley CS, Onomichi KB, Levine L, Nelson KE, Nealon NM, Engel C, Kruse-Hoyer M, Marcille M, Tornes L, Rumpf A, Greer A, Kenneally Behne M, Rodriguez RR, Behne DW, Blackway DW, Coords B, Blaschke TF, Sheard J, Smith TJ, Behne JM, Yeaman MR, Guthy-Jackson Charitable Foundation International Clinical Consortium (GJCF–ICC)",
    "journal": "Neurol Neuroimmunol Neuroinflamm",
    "year": 2019,
    "pmid": "31454765",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub98",
    "title": "Early B cell tolerance defects in neuromyelitis optica favour anti-AQP4 autoantibody production.",
    "authors": "Cotzomi E, Stathopoulos P, Lee CS, Ritchie AM, Soltys JN, Delmotte FR, Oe T, Sng J, Jiang R, Ma AK, Vander Heiden JA, Kleinstein SH, Levy M, Bennett JL, Meffre E, O'Connor KC",
    "journal": "Brain",
    "year": 2019,
    "doi": "10.1093/brain/awz106",
    "pmid": "31056665",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub99",
    "title": "Early B cell tolerance defects in neuromyelitis optica favour anti-AQP4 autoantibody production.",
    "authors": "Cotzomi E, Stathopoulos P, Lee CS, Ritchie AM, Soltys JN, Delmotte FR, Oe T, Sng J, Jiang R, Ma AK, Vander Heiden JA, Kleinstein SH, Levy M, Bennett JL, Meffre E, O'Connor KC",
    "journal": "Brain",
    "year": 2019,
    "doi": "10.1093/brain/awz106",
    "pmid": "31056665",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub100",
    "title": "Eculizumab in Aquaporin-4-Positive Neuromyelitis Optica Spectrum Disorder.",
    "authors": "Pittock SJ, Berthele A, Fujihara K, Kim HJ, Levy M, Palace J, Nakashima I, Terzi M, Totolyan N, Viswanathan S, Wang KC, Pace A, Fujita KP, Armstrong R, Wingerchuk DM",
    "journal": "N Engl J Med",
    "year": 2019,
    "doi": "10.1056/NEJMoa1900866",
    "pmid": "31050279",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub101",
    "title": "Editorial on: Eculizumab in aquaporin-4-positive neuromyelitis optica spectrum disorder.",
    "authors": "Pardo S, Giovannoni G, Hawkes C, Lechner-Scott J, Waubant E, Levy M",
    "journal": "Mult Scler Relat Disord",
    "year": 2019,
    "doi": "10.1016/j.msard.2019.07.001",
    "pmid": "31324299",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub102",
    "title": "Expanding the spectrum of MOG antibody disease.",
    "authors": "Levy M",
    "journal": "Mult Scler",
    "year": 2019,
    "doi": "10.1177/1352458519841824",
    "pmid": "30931729",
    "researchGroup": "MOGAD"
  },
  {
    "id": "pub103",
    "title": "MOG antibody-associated encephalomyelitis/encephalitis.",
    "authors": "Salama S, Khan M, Pardo S, Izbudak I, Levy M",
    "journal": "Mult Scler",
    "year": 2019,
    "doi": "10.1177/1352458519837705",
    "pmid": "30907249",
    "researchGroup": "MOGAD"
  },
  {
    "id": "pub104",
    "title": "MOG antibody-associated encephalomyelitis/encephalitis.",
    "authors": "Salama S, Khan M, Pardo S, Izbudak I, Levy M",
    "journal": "Mult Scler",
    "year": 2019,
    "doi": "10.1177/1352458519837705",
    "pmid": "30907249",
    "researchGroup": "Autoimmune Encephalitis"
  },
  {
    "id": "pub105",
    "title": "MOG-IgG myelitis coexisting with systemic lupus erythematosus in the post-partum setting.",
    "authors": "Bilodeau PA, Kumar V, Rodriguez AE, Li CT, Sanchez-Alvarez C, Thanarajasingam U, Zalewski NL, Flanagan EP",
    "journal": "Mult Scler",
    "year": 2019,
    "doi": "10.1177/1352458519872895",
    "pmid": "31621483",
    "researchGroup": "MOGAD"
  },
  {
    "id": "pub106",
    "title": "Multiple Sclerosis and Vitamin D - Caviar or a Dog's Dinner?",
    "authors": "Hawkes C, Giovannoni G, Lechner-Scott J, Levy M, Waubant E",
    "journal": "Multiple Sclerosis and Vitamin D - Caviar or a Dog's Dinner? Mult Scler Relat Disord",
    "year": 2019,
    "pmid": "30823982",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub107",
    "title": "Radiological characteristics of myelin oligodendrocyte glycoprotein antibody disease.",
    "authors": "Salama S, Khan M, Levy M, Izbudak I",
    "journal": "Mult Scler Relat Disord",
    "year": 2019,
    "pmid": "30658259",
    "researchGroup": "MOGAD"
  },
  {
    "id": "pub108",
    "title": "Review of Treatment for Central Spinal Neuropathic Pain and Its Effect on Quality of Life: Implications for Neuromyelitis Optica Spectrum Disorder.",
    "authors": "Mealy MA, Kozachik SL, Levy M",
    "journal": "Pain Manag Nurs",
    "year": 2019,
    "doi": "10.1016/j.pmn.2019.03.003",
    "pmid": "31103517",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub109",
    "title": "Rituximab during pregnancy in neuromyelitis optica: A case report.",
    "authors": "Miranda-Acuña J, Rivas-Rodríguez E, Levy M, Ansari M, Stone R, Patel V, Amezcua L",
    "journal": "Neurol Neuroimmunol Neuroinflamm",
    "year": 2019,
    "pmid": "30800724",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub110",
    "title": "Role of complement and potential of complement inhibitors in myasthenia gravis and neuromyelitis optica spectrum disorders: a brief review.",
    "authors": "Chamberlain JL, Huda S, Whittam DH, Matiello M, Morgan BP, Jacob A",
    "journal": "J Neurol",
    "year": 2019,
    "doi": "10.1007/s00415-019-09498-4",
    "pmid": "31482201",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub111",
    "title": "Should our treatment target in MS include the intrathecal plasma cell response?",
    "authors": "Giovannoni G, Hawkes C, Levy M, Lechner-Scott J, Waubant E",
    "journal": "Should our treatment target in MS include the intrathecal plasma cell response? Mult Scler Relat Disord",
    "year": 2019,
    "doi": "10.1016/j.msard.2018.12.039",
    "pmid": "30642567",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub112",
    "title": "Teaching NeuroImages: Corkscrew medullary veins in active neurosarcoidosis.",
    "authors": "Caton MT, Yau WW, Huang RY, Bhattacharyya S",
    "journal": "Neurology",
    "year": 2019,
    "doi": "10.1212/WNL.0000000000008460",
    "pmid": "31685713",
    "researchGroup": "Neurosarcoidosis"
  },
  {
    "id": "pub113",
    "title": "Three suggestions to decrease the financial burden of MS treatments.",
    "authors": "Waubant E, Giovannoni G, Hawkes C, Lechner-Scott J, Levy M",
    "journal": "Mult Scler Relat Disord",
    "year": 2019,
    "doi": "10.1016/j.msard.2019.03.023",
    "pmid": "30987755",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub114",
    "title": "[MOG encephalomyelitis: international recommendations on diagnosis and antibody testing].",
    "authors": "Jarius S, Paul F, Aktas O, Asgari N, Dale RC, de Seze J, Franciotta D, Fujihara K, Jacob A, Kim HJ, Kleiter I, Kümpfel T, Levy M, Palace J, Ruprecht K, Saiz A, Trebst C, Weinshenker BG, Wildemann B",
    "journal": "Nervenarzt",
    "year": 2018,
    "pmid": "30264269",
    "researchGroup": "MOGAD"
  },
  {
    "id": "pub115",
    "title": "Are the high-costs of MS disease-modifying therapies justified?",
    "authors": "Giovannoni G, Hawkes C, Levy M, Waubant E",
    "journal": "Are the high-costs of MS disease-modifying therapies justified? Mult Scler Relat Disord",
    "year": 2018,
    "pmid": "29579631",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub116",
    "title": "Area postrema syndrome: Frequency, criteria, and severity in AQP4-IgG-positive NMOSD.",
    "authors": "Shosha E, Dubey D, Palace J, Nakashima I, Jacob A, Fujihara K, Takahashi T, Whittam D, Leite MI, Misu T, Yoshiki T, Messina S, Elsone L, Majed M, Flanagan E, Gadoth A, Huebert C, Sagen J, Greenberg BM, Levy M, Banerjee A, Weinshenker B, Pittock SJ",
    "journal": "Neurology",
    "year": 2018,
    "pmid": "30258024",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub117",
    "title": "Clinical and radiological characteristics of neuromyelitis optica spectrum disorder in the North Egyptian Nile Delta.",
    "authors": "Salama S, Marouf H, Ihab Reda M, Mansour AR, ELKholy O, Levy M",
    "journal": "J Neuroimmunol",
    "year": 2018,
    "doi": "10.1016/j.jneuroim.2018.08.014",
    "pmid": "30199734",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub118",
    "title": "Could antiretrovirals be treating EBV in MS? A case report.",
    "authors": "Drosu NC, Edelman ER, Housman DE",
    "journal": "Mult Scler Relat Disord",
    "year": 2018,
    "pmid": "29510325",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub119",
    "title": "Diagnosing and caring for MS in Haiti.",
    "authors": "Waubant E, Berkowitz A, Giovannoni G, Hawkes C, Levy M",
    "journal": "Mult Scler Relat Disord",
    "year": 2018,
    "doi": "10.1016/j.msard.2018.05.009",
    "pmid": "29807822",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub120",
    "title": "Effect of CXCR2 Inhibition on Behavioral Outcomes and Pathology in Rat Model of Neuromyelitis Optica.",
    "authors": "Jones MV, Levy M",
    "journal": "J Immunol Res",
    "year": 2018,
    "doi": "10.1155/2018/9034695",
    "pmid": "30648122",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub121",
    "title": "Efficacy and safety of mycophenolate mofetil in progressive multiple sclerosis patients.",
    "authors": "Fakih R, Matiello M, Chitnis T, Stankiewicz JM",
    "journal": "J Neurol",
    "year": 2018,
    "doi": "10.1007/s00415-018-9050-1",
    "pmid": "30203314",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub122",
    "title": "Investigational drugs in development to prevent neuromyelitis optica relapses.",
    "authors": "Paul F, Murphy O, Pardo S, Levy M",
    "journal": "Expert Opin Investig Drugs",
    "year": 2018,
    "doi": "10.1080/13543784.2018.1443077",
    "pmid": "29465257",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub123",
    "title": "Is cognitive impairment in multiple sclerosis reversible?",
    "authors": "Giovannoni G, Hawkes C, Levy M, Waubant E",
    "journal": "Is cognitive impairment in multiple sclerosis reversible? Mult Scler Relat Disord",
    "year": 2018,
    "doi": "10.1016/j.msard.2018.07.007",
    "pmid": "30049507",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub124",
    "title": "Long-term disability in neuromyelitis optica spectrum disorder with a history of myelitis is associated with age at onset, delay in diagnosis/preventive treatment, MRI lesion length and presence of symptomatic brain lesions.",
    "authors": "Mealy MA, Mossburg SE, Kim SH, Messina S, Borisow N, Lopez-Gonzalez R, Ospina JP, Scheel M, Yeshokumar AK, Awad A, Leite MI, Arango JJ, Paul F, Palace J, Kim HJ, Levy M",
    "journal": "Mult Scler Relat Disord",
    "year": 2018,
    "doi": "10.1016/j.msard.2018.12.011",
    "pmid": "30554040",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub125",
    "title": "MOG antibody disease: A review of MOG antibody seropositive neuromyelitis optica spectrum disorder.",
    "authors": "Narayan R, Simpson A, Fritsche K, Salama S, Pardo S, Mealy M, Paul F, Levy M",
    "journal": "Mult Scler Relat Disord",
    "year": 2018,
    "pmid": "30048919",
    "researchGroup": "MOGAD"
  },
  {
    "id": "pub126",
    "title": "MOG antibody disease: A review of MOG antibody seropositive neuromyelitis optica spectrum disorder.",
    "authors": "Narayan R, Simpson A, Fritsche K, Salama S, Pardo S, Mealy M, Paul F, Levy M",
    "journal": "Mult Scler Relat Disord",
    "year": 2018,
    "pmid": "30048919",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub127",
    "title": "MOG encephalomyelitis: international recommendations on diagnosis and antibody testing.",
    "authors": "Jarius S, Paul F, Aktas O, Asgari N, Dale RC, de Seze J, Franciotta D, Fujihara K, Jacob A, Kim HJ, Kleiter I, Kümpfel T, Levy M, Palace J, Ruprecht K, Saiz A, Trebst C, Weinshenker BG, Wildemann B",
    "journal": "J Neuroinflammation",
    "year": 2018,
    "doi": "10.1186/s12974-018-1144-2",
    "pmid": "29724224",
    "researchGroup": "MOGAD"
  },
  {
    "id": "pub128",
    "title": "Mortality in neuromyelitis optica is strongly associated with African ancestry.",
    "authors": "Mealy MA, Kessler RA, Rimler Z, Reid A, Totonis L, Cutter G, Kister I, Levy M",
    "journal": "Neurol Neuroimmunol Neuroinflamm",
    "year": 2018,
    "pmid": "29892608",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub129",
    "title": "Multiple Sclerosis and Autoimmune Neurology of the Central Nervous System.",
    "authors": "Galetta KM, Bhattacharyya S",
    "journal": "Med Clin North Am",
    "year": 2018,
    "doi": "10.1016/j.mcna.2018.10.004",
    "pmid": "30704684",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub130",
    "title": "Outcomes from acute attacks of neuromyelitis optica spectrum disorder correlate with severity of attack, age and delay to treatment.",
    "authors": "Banerjee A, Ng J, Coleman J, Ospina JP, Mealy M, Levy M",
    "journal": "Mult Scler Relat Disord",
    "year": 2018,
    "doi": "10.1016/j.msard.2018.12.010",
    "pmid": "30554039",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub131",
    "title": "Plasmapheresis for acute attacks in neuromyelitis optica spectrum disorders.",
    "authors": "Levy M",
    "journal": "Neurol Neuroimmunol Neuroinflamm",
    "year": 2018,
    "doi": "10.1212/NXI.0000000000000510",
    "pmid": "30345335",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub132",
    "title": "Prevalence and characteristics of transverse myelitis and neuromyelitis optica spectrum disorders in the United Arab Emirates: A multicenter, retrospective study.",
    "authors": "Holroyd KB, Aziz F, Szolics M, Alsaadi T, Levy M, Schiess N",
    "journal": "Clin Exp Neuroimmunol",
    "year": 2018,
    "doi": "10.1111/cen3.12458",
    "pmid": "30090123",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub133",
    "title": "Racial differences in neuromyelitis optica spectrum disorder.",
    "authors": "Kim SH, Mealy MA, Levy M, Schmidt F, Ruprecht K, Paul F, Ringelstein M, Aktas O, Hartung HP, Asgari N, Tsz-Ching JL, Siritho S, Prayoonwiwat N, Shin HJ, Hyun JW, Han M, Leite MI, Palace J, Kim HJ",
    "journal": "Neurology",
    "year": 2018,
    "doi": "10.1212/WNL.0000000000006574",
    "pmid": "30366977",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub134",
    "title": "Refining the Nosology of Antigen-Specific Diseases Within the Spectrum of Neuromyelitis Optica.",
    "authors": "Levy M, Giovannoni G, Hawkes C, Waubant E",
    "journal": "Mult Scler Relat Disord",
    "year": 2018,
    "doi": "10.1016/j.msard.2018.09.027",
    "pmid": "30384960",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub135",
    "title": "Vaccines and the association with relapses in patients with neuromyelitis optica spectrum disorder.",
    "authors": "Mealy MA, Cook LJ, Pache F, Velez DL, Borisow N, Becker D, Arango JAJ, Paul F, Levy M",
    "journal": "Mult Scler Relat Disord",
    "year": 2018,
    "doi": "10.1016/j.msard.2018.05.003",
    "pmid": "29783157",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub136",
    "title": "Anti-aquaporin-4 titer is not predictive of disease course in neuromyelitis optica spectrum disorder: A multicenter cohort study.",
    "authors": "Kessler RA, Mealy MA, Jimenez-Arango JA, Quan C, Paul F, López R, Hopkins S, Levy M",
    "journal": "Mult Scler Relat Disord",
    "year": 2017,
    "pmid": "29055457",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub137",
    "title": "Aquaporin-4 serostatus does not predict response to immunotherapy in neuromyelitis optica spectrum disorders.",
    "authors": "Mealy MA, Kim SH, Schmidt F, López R, Jimenez Arango JA, Paul F, Wingerchuk DM, Greenberg BM, Kim HJ, Levy M",
    "journal": "Mult Scler",
    "year": 2017,
    "doi": "10.1177/1352458517730131",
    "pmid": "28857723",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub138",
    "title": "Enhancing Brain Lesions during Acute Optic Neuritis and/or Longitudinally Extensive Transverse Myelitis May Portend a Higher Relapse Rate in Neuromyelitis Optica Spectrum Disorders.",
    "authors": "Orman G, Wang KY, Pekcevik Y, Thompson CB, Mealy M, Levy M, Izbudak I",
    "journal": "AJNR Am J Neuroradiol",
    "year": 2017,
    "doi": "10.3174/ajnr.A5141",
    "pmid": "28302609",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub139",
    "title": "Evaluation of comorbidities and health care resource use among patients with highly active neuromyelitis optica.",
    "authors": "Ajmera MR, Boscoe A, Mauskopf J, Candrilli SD, Levy M",
    "journal": "J Neurol Sci",
    "year": 2017,
    "doi": "10.1016/j.jns.2017.11.022",
    "pmid": "29249387",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub140",
    "title": "Female hormonal exposures and neuromyelitis optica symptom onset in a multicenter study.",
    "authors": "Bove R, Elsone L, Alvarez E, Borisow N, Cortez MM, Mateen FJ, Mealy MA, Mutch K, Tobyne S, Ruprecht K, Buckle G, Levy M, Wingerchuk DM, Paul F, Cross AH, Weinshenker B, Jacob A, Klawiter EC, Chitnis T",
    "journal": "Neurol Neuroimmunol Neuroinflamm",
    "year": 2017,
    "doi": "10.1212/NXI.0000000000000339",
    "pmid": "28382320",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub141",
    "title": "High risk of postpartum relapses in neuromyelitis optica spectrum disorder.",
    "authors": "Klawiter EC, Bove R, Elsone L, Alvarez E, Borisow N, Cortez M, Mateen F, Mealy MA, Sorum J, Mutch K, Tobyne SM, Ruprecht K, Buckle G, Levy M, Wingerchuk D, Paul F, Cross AH, Jacobs A, Chitnis T, Weinshenker B",
    "journal": "Neurology",
    "year": 2017,
    "doi": "10.1212/WNL.0000000000004681",
    "pmid": "29093070",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub142",
    "title": "Patient perspectives on neuromyelitis optica spectrum disorders: Data from the PatientsLikeMe online community.",
    "authors": "Eaneff S, Wang V, Hanger M, Levy M, Mealy MA, Brandt AU, Eek D, Ratchford JN, Nyberg F, Goodall J, Wicks P",
    "journal": "Mult Scler Relat Disord",
    "year": 2017,
    "pmid": "29055439",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub143",
    "title": "Sublethal oligodendrocyte injury: A reversible condition in multiple sclerosis?",
    "authors": "Cui QL, Khan D, Rone M, T S Rao V, Johnson RM, Lin YH, Bilodeau PA, Hall JA, Rodriguez M, Kennedy TE, Ludwin SK, Antel JP",
    "journal": "Sublethal oligodendrocyte injury: A reversible condition in multiple sclerosis? Ann Neurol",
    "year": 2017,
    "doi": "10.1002/ana.24944",
    "pmid": "28470695",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub144",
    "title": "Cognition, mood, and purpose in life in neuromyelitis optica spectrum disorder.",
    "authors": "Hollinger KR, Franke C, Arenivas A, Woods SR, Mealy MA, Levy M, Kaplin AI",
    "journal": "J Neurol Sci",
    "year": 2016,
    "doi": "10.1016/j.jns.2016.01.010",
    "pmid": "26944124",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub145",
    "title": "Early indicators of relapses vs pseudorelapses in neuromyelitis optica spectrum disorder.",
    "authors": "Kessler RA, Mealy MA, Levy M",
    "journal": "Neurol Neuroimmunol Neuroinflamm",
    "year": 2016,
    "pmid": "27508210",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub146",
    "title": "Epidemiology of aquaporin-4 autoimmunity and neuromyelitis optica spectrum.",
    "authors": "Flanagan EP, Cabre P, Weinshenker BG, Sauver JS, Jacobson DJ, Majed M, Lennon VA, Lucchinetti CF, McKeon A, Matiello M, Kale N, Wingerchuk DM, Mandrekar J, Sagen JA, Fryer JP, Robinson AB, Pittock SJ",
    "journal": "Ann Neurol",
    "year": 2016,
    "doi": "10.1002/ana.24617",
    "pmid": "26891082",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub147",
    "title": "Insufficient treatment of severe depression in neuromyelitis optica spectrum disorder.",
    "authors": "Chavarro VS, Mealy MA, Simpson A, Lacheta A, Pache F, Ruprecht K, Gold SM, Paul F, Brandt AU, Levy M",
    "journal": "Neurol Neuroimmunol Neuroinflamm",
    "year": 2016,
    "doi": "10.1212/NXI.0000000000000286",
    "pmid": "27800532",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub148",
    "title": "Neuromyelitis optica spectrum disorders in children and adolescents.",
    "authors": "Tenembaum S, Chitnis T, Nakashima I, Collongues N, McKeon A, Levy M, Rostasy K",
    "journal": "Neurology",
    "year": 2016,
    "doi": "10.1212/WNL.0000000000002824",
    "pmid": "27572863",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub149",
    "title": "Neuromyelitis optica unmasked by a spinal dural arteriovenous fistula.",
    "authors": "Freund B, Mowry EM, Levy M, Newsome SD",
    "journal": "J Neuroimmunol",
    "year": 2016,
    "doi": "10.1016/j.jneuroim.2016.10.005",
    "pmid": "27806871",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub150",
    "title": "Primary angiitis of the central nervous system: avoiding misdiagnosis and missed diagnosis of a rare disease.",
    "authors": "Bhattacharyya S, Berkowitz AL",
    "journal": "Pract Neurol",
    "year": 2016,
    "pmid": "26837371",
    "researchGroup": "CNS Vasculitis"
  },
  {
    "id": "pub151",
    "title": "Rapidly Cycling Auras and Episodic Focal Dystonia in Anti-LGI1 Autoimmune Encephalitis.",
    "authors": "Fantaneanu TA, Bhattacharyya S, Milligan TA, Pennell PB",
    "journal": "JAMA Neurol",
    "year": 2016,
    "doi": "10.1001/jamaneurol.2016.1085",
    "pmid": "27399958",
    "researchGroup": "Autoimmune Encephalitis"
  },
  {
    "id": "pub152",
    "title": "Spinal Movement Disorders in Neuromyelitis Optica: An Under-recognized Phenomenon.",
    "authors": "Abboud H, Fernandez HH, Mealy MA, Levy M",
    "journal": "Mov Disord Clin Pract",
    "year": 2016,
    "doi": "10.1002/mdc3.12321",
    "pmid": "30838252",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub153",
    "title": "The Type I Interferon Response Determines Differences in Choroid Plexus Susceptibility between Newborns and Adults in Herpes Simplex Virus Encephalitis.",
    "authors": "Wilcox DR, Folmsbee SS, Muller WJ, Longnecker R",
    "journal": "mBio",
    "year": 2016,
    "doi": "10.1128/mBio.00437-16",
    "pmid": "27073094",
    "researchGroup": "Autoimmune Encephalitis"
  },
  {
    "id": "pub154",
    "title": "Tolerance checkpoint bypass permits emergence of pathogenic T cells to neuromyelitis optica autoantigen aquaporin-4.",
    "authors": "Sagan SA, Winger RC, Cruz-Herranz A, Nelson PA, Hagberg S, Miller CN, Spencer CM, Ho PP, Bennett JL, Levy M, Levin MH, Verkman AS, Steinman L, Green AJ, Anderson MS, Sobel RA, Zamvil SS",
    "journal": "Proc Natl Acad Sci U S A",
    "year": 2016,
    "doi": "10.1073/pnas.1617859114",
    "pmid": "27940915",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub155",
    "title": "Tolerance checkpoint bypass permits emergence of pathogenic T cells to neuromyelitis optica autoantigen aquaporin-4.",
    "authors": "Sagan SA, Winger RC, Cruz-Herranz A, Nelson PA, Hagberg S, Miller CN, Spencer CM, Ho PP, Bennett JL, Levy M, Levin MH, Verkman AS, Steinman L, Green AJ, Anderson MS, Sobel RA, Zamvil SS",
    "journal": "Proc Natl Acad Sci U S A",
    "year": 2016,
    "doi": "10.1073/pnas.1617859114",
    "pmid": "27940915",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub156",
    "title": "Treatment of Neuromyelitis Optica Spectrum Disorder: Acute, Preventive, and Symptomatic.",
    "authors": "Kessler RA, Mealy MA, Levy M",
    "journal": "Curr Treat Options Neurol",
    "year": 2016,
    "doi": "10.1007/s11940-015-0387-9",
    "pmid": "26705758",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub157",
    "title": "Bevacizumab is safe in acute relapses of neuromyelitis optica.",
    "authors": "Mealy MA, Shin K, John G, Levy M",
    "journal": "Clin Exp Neuroimmunol",
    "year": 2015,
    "doi": "10.1111/cen3.12239",
    "pmid": "26834844",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub158",
    "title": "Brainstem and limbic encephalitis with paraneoplastic neuromyelitis optica.",
    "authors": "Moussawi K, Lin DJ, Matiello M, Chew S, Morganstern D, Vaitkevicius H",
    "journal": "J Clin Neurosci",
    "year": 2015,
    "pmid": "26412254",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub159",
    "title": "Brainstem and limbic encephalitis with paraneoplastic neuromyelitis optica.",
    "authors": "Moussawi K, Lin DJ, Matiello M, Chew S, Morganstern D, Vaitkevicius H",
    "journal": "J Clin Neurosci",
    "year": 2015,
    "pmid": "26412254",
    "researchGroup": "Autoimmune Encephalitis"
  },
  {
    "id": "pub160",
    "title": "Challenges and opportunities in designing clinical trials for neuromyelitis optica.",
    "authors": "Weinshenker BG, Barron G, Behne JM, Bennett JL, Chin PS, Cree BA, de Seze J, Flor A, Fujihara K, Greenberg B, Higashi S, Holt W, Khan O, Knappertz V, Levy M, Melia AT, Palace J, Smith TJ, Sormani MP, Van Herle K, VanMeter S, Villoslada P, Walton MK, Wasiewski W, Wingerchuk DM, Yeaman MR, Guthy-Jackson Charitable Foundation International Clinical Consortium",
    "journal": "Neurology",
    "year": 2015,
    "doi": "10.1212/WNL.0000000000001520",
    "pmid": "25841026",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub161",
    "title": "Differential reliance on autophagy for protection from HSV encephalitis between newborns and adults.",
    "authors": "Wilcox DR, Wadhwani NR, Longnecker R, Muller WJ",
    "journal": "PLoS Pathog",
    "year": 2015,
    "pmid": "25569138",
    "researchGroup": "Autoimmune Encephalitis"
  },
  {
    "id": "pub162",
    "title": "Differentiating neuromyelitis optica from other causes of longitudinally extensive transverse myelitis on spinal magnetic resonance imaging.",
    "authors": "Pekcevik Y, Mitchell CH, Mealy MA, Orman G, Lee IH, Newsome SD, Thompson CB, Pardo CA, Calabresi PA, Levy M, Izbudak I",
    "journal": "Mult Scler",
    "year": 2015,
    "doi": "10.1177/1352458515591069",
    "pmid": "26209588",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub163",
    "title": "Emerging Cases of Powassan Virus Encephalitis in New England: Clinical Presentation, Imaging, and Review of the Literature.",
    "authors": "Piantadosi A, Rubin DB, McQuillen DP, Hsu L, Lederer PA, Ashbaugh CD, Duffalo C, Duncan R, Thon J, Bhattacharyya S, Basgoz N, Feske SK, Lyons JL",
    "journal": "Clin Infect Dis",
    "year": 2015,
    "doi": "10.1093/cid/civ1005",
    "pmid": "26668338",
    "researchGroup": "Autoimmune Encephalitis"
  },
  {
    "id": "pub164",
    "title": "Favorable outcome of granulocyte colony-stimulating factor use in neuromyelitis optica patients presenting with agranulocytosis in the setting of rituximab.",
    "authors": "Mealy MA, Levy M",
    "journal": "J Neuroimmunol",
    "year": 2015,
    "doi": "10.1016/j.jneuroim.2015.08.003",
    "pmid": "26439958",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub165",
    "title": "Herpesvirus entry mediator on radiation-resistant cell lineages promotes ocular herpes simplex virus 1 pathogenesis in an entry-independent manner.",
    "authors": "Edwards RG, Kopp SJ, Karaba AH, Wilcox DR, Longnecker R",
    "journal": "mBio",
    "year": 2015,
    "pmid": "26489863",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub166",
    "title": "International consensus diagnostic criteria for neuromyelitis optica spectrum disorders.",
    "authors": "Wingerchuk DM, Banwell B, Bennett JL, Cabre P, Carroll W, Chitnis T, de Seze J, Fujihara K, Greenberg B, Jacob A, Jarius S, Lana-Peixoto M, Levy M, Simon JH, Tenembaum S, Traboulsee AL, Waters P, Wellik KE, Weinshenker BG, International Panel for NMO Diagnosis",
    "journal": "Neurology",
    "year": 2015,
    "doi": "10.1212/WNL.0000000000001729",
    "pmid": "26092914",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub167",
    "title": "Longitudinally extensive optic neuritis as an MRI biomarker distinguishes neuromyelitis optica from multiple sclerosis.",
    "authors": "Mealy MA, Whetstone A, Orman G, Izbudak I, Calabresi PA, Levy M",
    "journal": "J Neurol Sci",
    "year": 2015,
    "doi": "10.1016/j.jns.2015.05.013",
    "pmid": "26026942",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub168",
    "title": "Longitudinally extensive optic neuritis as an MRI biomarker distinguishes neuromyelitis optica from multiple sclerosis.",
    "authors": "Mealy MA, Whetstone A, Orman G, Izbudak I, Calabresi PA, Levy M",
    "journal": "J Neurol Sci",
    "year": 2015,
    "doi": "10.1016/j.jns.2015.05.013",
    "pmid": "26026942",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub169",
    "title": "Neuromyelitis optica and multiple sclerosis: Seeing differences through optical coherence tomography.",
    "authors": "Bennett JL, de Seze J, Lana-Peixoto M, Palace J, Waldman A, Schippling S, Tenembaum S, Banwell B, Greenberg B, Levy M, Fujihara K, Chan KH, Kim HJ, Asgari N, Sato DK, Saiz A, Wuerfel J, Zimmermann H, Green A, Villoslada P, Paul F, GJCF-ICC&amp;BR",
    "journal": "Mult Scler",
    "year": 2015,
    "doi": "10.1177/1352458514567216",
    "pmid": "25662342",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub170",
    "title": "Neuromyelitis optica and multiple sclerosis: Seeing differences through optical coherence tomography.",
    "authors": "Bennett JL, de Seze J, Lana-Peixoto M, Palace J, Waldman A, Schippling S, Tenembaum S, Banwell B, Greenberg B, Levy M, Fujihara K, Chan KH, Kim HJ, Asgari N, Sato DK, Saiz A, Wuerfel J, Zimmermann H, Green A, Villoslada P, Paul F, GJCF-ICC&amp;BR",
    "journal": "Mult Scler",
    "year": 2015,
    "doi": "10.1177/1352458514567216",
    "pmid": "25662342",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub171",
    "title": "Pathogenic aquaporin-4 reactive T cells are sufficient to induce mouse model of neuromyelitis optica.",
    "authors": "Jones MV, Huang H, Calabresi PA, Levy M",
    "journal": "Acta Neuropathol Commun",
    "year": 2015,
    "pmid": "25990016",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub172",
    "title": "Pathogenic aquaporin-4 reactive T cells are sufficient to induce mouse model of neuromyelitis optica.",
    "authors": "Jones MV, Huang H, Calabresi PA, Levy M",
    "journal": "Acta Neuropathol Commun",
    "year": 2015,
    "pmid": "25990016",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub173",
    "title": "Posterior reversible encephalopathy syndrome is not associated with mutations in aquaporin-4.",
    "authors": "Matiello M, Muralidharan R, Sun D, Rabinstein AA, Weinshenker BG",
    "journal": "Neurol Genet",
    "year": 2015,
    "doi": "10.1212/NXG.0000000000000013",
    "pmid": "27066556",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub174",
    "title": "Status of diagnostic approaches to AQP4-IgG seronegative NMO and NMO/MS overlap syndromes.",
    "authors": "Jurynczyk M, Weinshenker B, Akman-Demir G, Asgari N, Barnes D, Boggild M, Chaudhuri A, D'hooghe M, Evangelou N, Geraldes R, Illes Z, Jacob A, Kim HJ, Kleiter I, Levy M, Marignier R, McGuigan C, Murray K, Nakashima I, Pandit L, Paul F, Pittock S, Selmaj K, de Sèze J, Siva A, Tanasescu R, Vukusic S, Wingerchuk D, Wren D, Leite I, Palace J",
    "journal": "J Neurol",
    "year": 2015,
    "doi": "10.1007/s00415-015-7952-8",
    "pmid": "26530512",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub175",
    "title": "Status of diagnostic approaches to AQP4-IgG seronegative NMO and NMO/MS overlap syndromes.",
    "authors": "Jurynczyk M, Weinshenker B, Akman-Demir G, Asgari N, Barnes D, Boggild M, Chaudhuri A, D'hooghe M, Evangelou N, Geraldes R, Illes Z, Jacob A, Kim HJ, Kleiter I, Levy M, Marignier R, McGuigan C, Murray K, Nakashima I, Pandit L, Paul F, Pittock S, Selmaj K, de Sèze J, Siva A, Tanasescu R, Vukusic S, Wingerchuk D, Wren D, Leite I, Palace J",
    "journal": "J Neurol",
    "year": 2015,
    "doi": "10.1007/s00415-015-7952-8",
    "pmid": "26530512",
    "researchGroup": "Translational Neuroimmunology"
  },
  {
    "id": "pub176",
    "title": "The ethics of placebo controlled clinical trials in NMO - A balance of risks.",
    "authors": "Levy M",
    "journal": "Mult Scler Relat Disord",
    "year": 2015,
    "pmid": "26590656",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub177",
    "title": "Treatment of acute relapses in neuromyelitis optica: Steroids alone versus steroids plus plasma exchange.",
    "authors": "Abboud H, Petrak A, Mealy M, Sasidharan S, Siddique L, Levy M",
    "journal": "Mult Scler",
    "year": 2015,
    "doi": "10.1177/1352458515581438",
    "pmid": "25921047",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub178",
    "title": "Treatment of neuromyelitis optica.",
    "authors": "Vodopivec I, Matiello M, Prasad S",
    "journal": "Curr Opin Ophthalmol",
    "year": 2015,
    "pmid": "26367088",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub179",
    "title": "Update on biomarkers in neuromyelitis optica.",
    "authors": "Melamed E, Levy M, Waters PJ, Sato DK, Bennett JL, John GR, Hooper DC, Saiz A, Bar-Or A, Kim HJ, Pandit L, Leite MI, Asgari N, Kissani N, Hintzen R, Marignier R, Jarius S, Marcelletti J, Smith TJ, Yeaman MR, Han MH, Aktas O, Apiwattanakul M, Banwell B, Bichuetti D, Broadley S, Cabre P, Chitnis T, De Seze J, Fujihara K, Greenberg B, Hellwig K, Iorio R, Jarius S, Klawiter E, Kleiter I, Lana-Peixoto M, O'Connor K, Palace J, Paul F, Prayoonwiwat N, Ruprecht K, Stuve O, Tedder T, Tenembaum S, Garrahan JP, Aires B, van Herle K, van Pelt D, Villoslada P, Waubant E, Weinshenker B, Wingerchuk D, Würfel J, Zamvil S",
    "journal": "Neurol Neuroimmunol Neuroinflamm",
    "year": 2015,
    "doi": "10.1212/NXI.0000000000000134",
    "pmid": "26236760",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub180",
    "title": "Use of Advanced Magnetic Resonance Imaging Techniques in Neuromyelitis Optica Spectrum Disorder.",
    "authors": "Kremer S, Renard F, Achard S, Lana-Peixoto MA, Palace J, Asgari N, Klawiter EC, Tenembaum SN, Banwell B, Greenberg BM, Bennett JL, Levy M, Villoslada P, Saiz A, Fujihara K, Chan KH, Schippling S, Paul F, Kim HJ, de Seze J, Wuerfel JT, Guthy-Jackson Charitable Foundation (GJCF) Neuromyelitis Optica (NMO) International Clinical Consort, Cabre P, Marignier R, Tedder T, van Pelt D, Broadley S, Chitnis T, Wingerchuk D, Pandit L, Leite MI, Apiwattanakul M, Kleiter I, Prayoonwiwat N, Han M, Hellwig K, van Herle K, John G, Hooper DC, Nakashima I, Sato D, Yeaman MR, Waubant E, Zamvil S, Stüve O, Aktas O, Smith TJ, Jacob A, O'Connor K",
    "journal": "JAMA Neurol",
    "year": 2015,
    "doi": "10.1001/jamaneurol.2015.0248",
    "pmid": "26010909",
    "researchGroup": "NMOSD"
  },
  {
    "id": "pub181",
    "title": "What do we know about brain contrast enhancement patterns in neuromyelitis optica?",
    "authors": "Pekcevik Y, Orman G, Lee IH, Mealy MA, Levy M, Izbudak I",
    "journal": "What do we know about brain contrast enhancement patterns in neuromyelitis optica? Clin Imaging",
    "year": 2015,
    "pmid": "26615899",
    "researchGroup": "NMOSD"
  }
]
