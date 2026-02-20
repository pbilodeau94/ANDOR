export type Publication = {
  id: string
  title: string
  authors: string
  journal: string
  year: number
  doi?: string
  pmid?: string
  researchGroup: string
  featured?: boolean
}

export const publications: Publication[] = [
  {
      "id": "pub1",
      "title": "A threshold in anti-EBNA-1 antibody titers distinguishes salivary EBV shedders from non-shedders.",
      "authors": "Mahler JV, Bilodeau PA, Anderson M, Mikami T, Bobrowski-Khoury N, Jiang M, Zhu H, Nguyen J, Matiello M, Levy M, Bjornevik K, Drosu N",
      "journal": "J Infect Dis",
      "year": 2026,
      "pmid": "41493209",
      "researchGroup": "EBV and MS",
      "featured": true
  },
  {
      "id": "pub2",
      "title": "Comparative Effectiveness of Disease-Modifying Treatments in Double Seronegative Neuromyelitis Optica Spectrum Disorder.",
      "authors": "Mahler JV, Vallejos GB, Mikami T, Bilodeau PA, Anderson M, Drosu N, Bobrowski-Khoury N, Silva GD, Solti M, Apóstolos-Pereira SL, Callegaro D, Leles Vieira de Souza B, Manzano GS, Vishnevetsky A, Gillani R, Pasquale O, Kim A, Vij R, Kister I, Gibbons EL, Jacob A, Huda S, Said Y, Krett JD, Sotirchos ES, Ramprasad M, Abboud H, Crelier VTC, Dos Santos G, Uawithya E, Siritho S, Sezen A, Altintas A, Gai F, Guo Y, Bhattacharyya S, Levy M, Matiello M",
      "journal": "Neurol Neuroimmunol Neuroinflamm",
      "year": 2026,
      "pmid": "41637688",
      "researchGroup": "NMOSD",
      "featured": true
  },
  {
      "id": "pub3",
      "title": "Early Relapse Risk in Biopsy-Confirmed Primary Central Nervous System Vasculitis.",
      "authors": "Nguyen JV, Bilodeau PA, Mahler JV, Drosu N, Bobrowski-Khoury N, Quinn C, Mikami T, Anderson M, Levy M",
      "journal": "JAMA Neurol",
      "year": 2026,
      "pmid": "41489860",
      "researchGroup": "CNS Vasculitis",
      "featured": true
  },
  {
      "id": "pub4",
      "title": "Real-World Efficacy and Safety of Neuromyelitis Optica Spectrum Disorder Disease-Modifying Treatments.",
      "authors": "Bilodeau PA, Wruble Clark M, Ganguly A, Harowitz JB, Mahler JV, Jiang M, Narasimhan SS, Pua DK, Healy BC, Mateen FJ, Levy M, Bhattacharyya S",
      "journal": "Neurol Neuroimmunol Neuroinflamm",
      "year": 2026,
      "pmid": "41494145",
      "researchGroup": "NMOSD",
      "featured": true
  },
  {
      "id": "pub5",
      "title": "A Multi-Center Retrospective Cohort Study of Neurosarcoidosis Myelitis: Current Observations and Future Directions.",
      "authors": "Manzano GS, Balaban D, Zhang Y, Healy B, Chwalisz BK, Levy M, Venna N, Stern BJ, Pardo CA, Barreras P, Rjeily NB, Flanagan EP, Redenbaugh V, Aksamit AJ, Hutto S, Herman M, El Sammak S, Rodriguez EC, Snider L, Rains H, Montalvo M, Rempe T, Ramirez SM, Horta L, Clardy S, Lord J, Cho TA, Abdel Wahed L, Berger JR, Samudralwar RD, Torres NR, Clifford DB, Dunham SR, Majed M, Zabeti A, Marcucci S, Mao-Draayer Y, Doty J, Agyei PB, Bhattacharyya S",
      "journal": "Ann Clin Transl Neurol",
      "year": 2025,
      "pmid": "40963302",
      "researchGroup": "Neurosarcoidosis",
      "featured": true
  },
  {
      "id": "pub6",
      "title": "Consensus Recommendations for the Management of Neurosarcoidosis: A Delphi Survey of Experts Across the United States.",
      "authors": "Manzano GS, Eaton J, Levy M, Abbatemarco JR, Aksamit AJ, Anand P, Balaban DT, Barreras P, Baughman RP, Bhattacharyya S, Bomprezzi R, Cho TA, Chwalisz B, Clardy SL, Clifford DB, Flanagan EP, Gelfand JM, Harrold GK, Hutto SK, Pawate S, Rivera Torres N, Abdel-Wahed L, Dunham SR, Gupta RK, Moss B, Pardo CA, Samudralwar RD, Venna N, Zabeti A, Kister I",
      "journal": "Neurol Clin Pract",
      "year": 2025,
      "doi": "10.1212/CPJ.0000000000200429",
      "pmid": "39830676",
      "researchGroup": "Neurosarcoidosis",
      "featured": true
  },
  {
      "id": "pub7",
      "title": "Neuropsychologic impact of MOGAD: A patient reported outcomes study.",
      "authors": "Leles B, Zhang Y, Bilodeau PA, Vishnevetsky A, Mikami T, Anderson M, Gillani R, Wruble Clark M, Salky R, Romanow G, Levy M, Manzano GS",
      "journal": "Mult Scler Relat Disord",
      "year": 2025,
      "pmid": "41421010",
      "researchGroup": "MOGAD",
      "featured": true
  },
  {
      "id": "pub8",
      "title": "Potential mechanisms of how B-cell depletion works in MOGAD.",
      "authors": "Bilodeau PA, Yeh A, Lechner-Scott J, Hawkes CH, Giovannoni G, Levy M",
      "journal": "Mult Scler Relat Disord",
      "year": 2025,
      "doi": "10.1016/j.msard.2025.106269",
      "pmid": "39827742",
      "researchGroup": "MOGAD",
      "featured": true
  },
  {
      "id": "pub9",
      "title": "Validity of model for predicting risk of relapse in MOGAD.",
      "authors": "Jiang M, Bilodeau PA, Healy B, Yeh EA, Giovannoni G, Hawkes C, Lechner-Scott J, Levy M",
      "journal": "Mult Scler Relat Disord",
      "year": 2025,
      "pmid": "41238291",
      "researchGroup": "MOGAD",
      "featured": true
  },
  {
      "id": "pub10",
      "title": "A transcutaneous electrical nerve stimulation device for the relief of neuropathic pain in NMOSD: A randomized, double-blind, sham-controlled trial.",
      "authors": "Vishnevetsky A, Romanow G, Levy M",
      "journal": "Mult Scler J Exp Transl Clin",
      "year": 2024,
      "doi": "10.1177/20552173241301018",
      "pmid": "39651334",
      "researchGroup": "NMOSD",
      "featured": true
  },
  {
      "id": "pub11",
      "title": "An evaluation of ravulizumab for the treatment of neuromyelitis optica spectrum disorder.",
      "authors": "Balaban DT, Levy M, Borrow R, Anderson MR",
      "journal": "Expert Opin Biol Ther",
      "year": 2024,
      "doi": "10.1080/14712598.2024.2423002",
      "pmid": "39460545",
      "researchGroup": "NMOSD",
      "featured": true
  },
  {
      "id": "pub12",
      "title": "Assessment of international MOGAD diagnostic criteria in patients with overlapping MOG-associated disease and multiple sclerosis phenotypes.",
      "authors": "Manzano GS, Levy M, Salky R, Mateen FJ, Klawiter EC, Chitnis T, Vasileiou ES, Sotirchos ES, Gibbons E, Huda S, Jacob A, Matiello M",
      "journal": "J Neurol",
      "year": 2024,
      "doi": "10.1007/s00415-024-12585-w",
      "pmid": "39066792",
      "researchGroup": "MOGAD",
      "featured": true
  },
  {
      "id": "pub13",
      "title": "CD4 T cells restricted to DRB1*15:01 recognize two Epstein-Barr virus glycoproteins capable of intracellular antigen presentation.",
      "authors": "Drosu N, Anderson M, Bilodeau PA, Nishiyama S, Mikami T, Bobrowski-Khoury N, Cabot J, Housman D, Levy M",
      "journal": "Proc Natl Acad Sci U S A",
      "year": 2024,
      "doi": "10.1073/pnas.2416097121",
      "pmid": "39432795",
      "researchGroup": "EBV and MS",
      "featured": true
  },
  {
      "id": "pub14",
      "title": "Coeliac disease as a model for understanding multiple sclerosis.",
      "authors": "Drosu N, Bjornevik K, Cortese M, Levy M, Sollid LM",
      "journal": "Nat Rev Neurol",
      "year": 2024,
      "doi": "10.1038/s41582-024-01025-y",
      "pmid": "39379493",
      "researchGroup": "EBV and MS",
      "featured": true
  },
  {
      "id": "pub15",
      "title": "Effectiveness of immunotherapies in relapsing myelin oligodendrocyte glycoprotein antibody-associated disease.",
      "authors": "Bilodeau PA, Vishnevetsky A, Molazadeh N, Lotan I, Anderson M, Romanow G, Salky R, Healy BC, Matiello M, Chitnis T, Levy M",
      "journal": "Mult Scler",
      "year": 2024,
      "doi": "10.1177/13524585241226830",
      "pmid": "38314479",
      "researchGroup": "MOGAD",
      "featured": true
  },
  {
      "id": "pub16",
      "title": "Extra-Limbic Seronegative Encephalitis Preceding Recurrent Hodgkin's Lymphoma and Gastric Diffuse Large B-Cell Lymphoma: A Case Report.",
      "authors": "Li C, Fisher D, Bhattacharyya S",
      "journal": "Neurohospitalist",
      "year": 2024,
      "doi": "10.1177/19418744241265393",
      "pmid": "39308461",
      "researchGroup": "Autoimmune Encephalitis",
      "featured": true
  },
  {
      "id": "pub17",
      "title": "Herpes Simplex Virus Encephalitis in Patients With Autoimmune Conditions or Exposure to Immunomodulatory Medications.",
      "authors": "Tang A, Yoshida K, Lahey H, Wilcox DR, Guan H, Costenbader K, Solomon D, Miyawaki EK, Bhattacharyya S",
      "journal": "Neurology",
      "year": 2024,
      "doi": "10.1212/WNL.0000000000209297",
      "pmid": "38696733",
      "researchGroup": "Autoimmune Encephalitis",
      "featured": true
  },
  {
      "id": "pub18",
      "title": "In the era of antiviral trials for MS, the answer lies in the details.",
      "authors": "Drosu N, Bjornevik K, Bilodeau PA, Yeh A, Lechner-Scott J, Hawkes CH, Giovannoni G, Levy M",
      "journal": "Mult Scler Relat Disord",
      "year": 2024,
      "doi": "10.1016/j.msard.2024.105444",
      "pmid": "38241758",
      "researchGroup": "EBV and MS",
      "featured": true
  },
  {
      "id": "pub19",
      "title": "Long-term MRI and clinical stability in an HIV-positive patient with multiple sclerosis on tenofovir: A case report.",
      "authors": "Drosu N, Bjornevik K, Bilodeau P, Levy M",
      "journal": "Mult Scler Relat Disord",
      "year": 2024,
      "doi": "10.1016/j.msard.2023.105397",
      "pmid": "38246000",
      "researchGroup": "EBV and MS",
      "featured": true
  },
  {
      "id": "pub20",
      "title": "Mr. Machiavelli's Choice for Treatment of MOG Antibody Disease: Do the benefits of long-term corticosteroids justify the means?",
      "authors": "Levy M, Yeh A, Hawkes C, Lechner-Scott J, Giovannoni G",
      "journal": "Mult Scler Relat Disord",
      "year": 2024,
      "doi": "10.1016/j.msard.2024.105794",
      "pmid": "39111225",
      "researchGroup": "MOGAD",
      "featured": true
  },
  {
      "id": "pub21",
      "title": "Practical Neurology",
      "authors": "Vishnevetsky A, Wilcox DR, Farhad K, Varma-Doyle A, O’Neal MA, Robbins NM",
      "journal": "Long-term neurologic complications of COVID-19: a practical overview",
      "year": 2024,
      "researchGroup": "Autoimmune Encephalitis",
      "featured": true
  },
  {
      "id": "pub22",
      "title": "Predictors of relapsing disease course following index event in myelin oligodendrocyte glycoprotein antibody-associated disease (MOGAD).",
      "authors": "Molazadeh N, Bilodeau PA, Salky R, Bose G, Lotan I, Romanow G, Anderson MR, Matiello M, Chitnis T, Levy M",
      "journal": "J Neurol Sci",
      "year": 2024,
      "doi": "10.1016/j.jns.2024.122909",
      "pmid": "38335710",
      "researchGroup": "MOGAD",
      "featured": true
  },
  {
      "id": "pub23",
      "title": "Stroke associated with sarcoidosis: A systematic review of reported cases.",
      "authors": "Pua DKA, Anand P, Bhattacharyya S",
      "journal": "J Neurol Sci",
      "year": 2024,
      "doi": "10.1016/j.jns.2024.123080",
      "pmid": "38850770",
      "researchGroup": "Neurosarcoidosis",
      "featured": true
  },
  {
      "id": "pub24",
      "title": "Characteristics of Progressive Multifocal Leukoencephalopathy Associated With Sarcoidosis Without Therapeutic Immune Suppression.",
      "authors": "McEntire CRS, Fletcher A, Toledano M, Epstein S, White E, Tan CS, Mao-Draayer Y, Banks SA, Aksamit AJ, Gelfand JM, Thakur KT, Anand P, Cortese I, Bhattacharyya S",
      "journal": "JAMA Neurol",
      "year": 2023,
      "doi": "10.1001/jamaneurol.2023.0841",
      "pmid": "37093609",
      "researchGroup": "Neurosarcoidosis",
      "featured": true
  },
  {
      "id": "pub25",
      "title": "Low mortality rate in a large cohort of myelin oligodendrocyte glycoprotein antibody disease (MOGAD).",
      "authors": "Lotan I, Romanow G, Salky R, Molazadeh N, Vishnevetsky A, Anderson M, Bilodeau PA, Cutter G, Levy M",
      "journal": "Ann Clin Transl Neurol",
      "year": 2023,
      "doi": "10.1002/acn3.51750",
      "pmid": "36852731",
      "researchGroup": "MOGAD",
      "featured": true
  },
  {
      "id": "pub26",
      "title": "Multiple types of relapses in MOG antibody disease.",
      "authors": "Levy M, Molazadeh N, Bilodeau PA, Vishnevetsky A, Lotan I, Salky R, Anderson M, Romanow G, Lechner-Scott J, Yeh EA, Giovannoni G",
      "journal": "Mult Scler Relat Disord",
      "year": 2023,
      "doi": "10.1016/j.msard.2023.104613",
      "pmid": "36931080",
      "researchGroup": "MOGAD"
  },
  {
      "id": "pub27",
      "title": "Progression independent of relapses in aquaporin4-IgG-seropositive neuromyelitis optica spectrum disorder, myelin oligodendrocyte glycoprotein antibody-associated disease, and multiple sclerosis.",
      "authors": "Molazadeh N, Akaishi T, Bose G, Nishiyama S, Chitnis T, Levy M",
      "journal": "Mult Scler Relat Disord",
      "year": 2023,
      "doi": "10.1016/j.msard.2023.105093",
      "pmid": "37949025",
      "researchGroup": "MOGAD"
  },
  {
      "id": "pub28",
      "title": "Progression independent of relapses in aquaporin4-IgG-seropositive neuromyelitis optica spectrum disorder, myelin oligodendrocyte glycoprotein antibody-associated disease, and multiple sclerosis.",
      "authors": "Molazadeh N, Akaishi T, Bose G, Nishiyama S, Chitnis T, Levy M",
      "journal": "Mult Scler Relat Disord",
      "year": 2023,
      "doi": "10.1016/j.msard.2023.105093",
      "pmid": "37949025",
      "researchGroup": "NMOSD",
      "featured": true
  },
  {
      "id": "pub29",
      "title": "Quantifying the economic burden to patients of relapse events from neuromyelitis optica spectrum disorders: A cross-sectional survey.",
      "authors": "Rice DR, Holroyd KB, Pua DK, Levy M, Mateen FJ, Bhattacharyya S",
      "journal": "Mult Scler Relat Disord",
      "year": 2023,
      "doi": "10.1016/j.msard.2023.104580",
      "pmid": "36805175",
      "researchGroup": "NMOSD",
      "featured": true
  },
  {
      "id": "pub30",
      "title": "EBV as the \"gluten of MS\" hypothesis provides a rationale for trialing antiviral therapies.",
      "authors": "Drosu N, Giovannoni G, Lechner-Scott J, Hawkes C, Yeh A, Levy M",
      "journal": "Mult Scler Relat Disord",
      "year": 2022,
      "doi": "10.1016/j.msard.2022.104007",
      "pmid": "35803161",
      "researchGroup": "EBV and MS",
      "featured": true
  },
  {
      "id": "pub31",
      "title": "Neurologic disease activity in people with multiple sclerosis treated with immune checkpoint inhibitors.",
      "authors": "Conway SE, Pua DKA, Holroyd KB, Galetta K, Bhattacharyya S",
      "journal": "Mult Scler",
      "year": 2022,
      "doi": "10.1177/13524585221117949",
      "pmid": "35957594",
      "researchGroup": "Autoimmune Encephalitis",
      "featured": true
  },
  {
      "id": "pub32",
      "title": "Positive Predictive Value of MOG-IgG for Clinically Defined MOG-AD Within a Real-World Cohort.",
      "authors": "Manzano GS, Salky R, Mateen FJ, Klawiter EC, Chitnis T, Levy M, Matiello M",
      "journal": "Front Neurol",
      "year": 2022,
      "doi": "10.3389/fneur.2022.947630",
      "pmid": "35795797",
      "researchGroup": "MOGAD"
  },
  {
      "id": "pub33",
      "title": "Transitioning immunotherapy in neuromyelitis optica spectrum disorder - when and how to switch.",
      "authors": "Vishnevetsky A, Kaplan TB, Levy M",
      "journal": "Expert Opin Biol Ther",
      "year": 2022,
      "doi": "10.1080/14712598.2022.2145879",
      "pmid": "36369948",
      "researchGroup": "NMOSD",
      "featured": true
  },
  {
      "id": "pub34",
      "title": "Treatment outcomes of first-ever episode of severe optic neuritis.",
      "authors": "Galetta K, Ryan S, Manzano G, Chibnik LB, Balaban D, Prasad S, Chwalisz BK, Salazar-Camelo A, Conway S, Levy M, Matiello M",
      "journal": "Mult Scler Relat Disord",
      "year": 2022,
      "doi": "10.1016/j.msard.2022.104020",
      "pmid": "35839615",
      "researchGroup": "MOGAD"
  },
  {
      "id": "pub35",
      "title": "Upregulated complement receptors correlate with Fc gamma receptor 3A-positive natural killer and natural killer-T cells in neuromyelitis optica spectrum disorder.",
      "authors": "Nishiyama S, Wright AE, Lotan I, Mikami T, Paul F, Aoki M, Levy M",
      "journal": "J Neuroinflammation",
      "year": 2022,
      "doi": "10.1186/s12974-022-02661-1",
      "pmid": "36503481",
      "researchGroup": "NMOSD",
      "featured": true
  },
  {
      "id": "pub36",
      "title": "Approach to Neurologic Complications in the Immunocompromised Patient.",
      "authors": "Vishnevetsky A, Anand P",
      "journal": "Semin Neurol",
      "year": 2021,
      "doi": "10.1055/s-0041-1733795",
      "pmid": "34619781",
      "researchGroup": "Autoimmune Encephalitis",
      "featured": true
  },
  {
      "id": "pub37",
      "title": "Neuroimmunological adverse events associated with immune checkpoint inhibitor: a retrospective, pharmacovigilance study using FAERS database.",
      "authors": "Mikami T, Liaw B, Asada M, Niimura T, Zamami Y, Green-LaRoche D, Pai L, Levy M, Jeyapalan S",
      "journal": "J Neurooncol",
      "year": 2021,
      "doi": "10.1007/s11060-020-03687-2",
      "pmid": "33423151",
      "researchGroup": "Autoimmune Encephalitis",
      "featured": true
  },
  {
      "id": "pub38",
      "title": "Neuromyelitis Optica Spectrum Disorder: Clinical Burden and Cost of Relapses and Disease-Related Care in US Clinical Practice.",
      "authors": "Royston M, Kielhorn A, Weycker D, Shaff M, Houde L, Tanvir I, Bhattacharyya S, Levy M",
      "journal": "Neurol Ther",
      "year": 2021,
      "doi": "10.1007/s40120-021-00253-4",
      "pmid": "34046846",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub39",
      "title": "Probing the association between Multiple Sclerosis and Epstein Barr Virus from a therapeutic perspective.",
      "authors": "Drosu N, Giovannoni G, Pohl D, Hawkes C, Lechner-Scott J, Levy M",
      "journal": "Mult Scler Relat Disord",
      "year": 2021,
      "doi": "10.1016/j.msard.2021.103087",
      "pmid": "34139660",
      "researchGroup": "EBV and MS"
  },
  {
      "id": "pub40",
      "title": "Quantifying the relationship between disability progression and quality of life in patients treated for NMOSD: Insights from the SAkura studies.",
      "authors": "Levy M, Haycox AR, Becker U, Costantino C, Damonte E, Klingelschmitt G, von Büdingen HC, Wallenstein G, Maio DD, Szczechowski L",
      "journal": "Mult Scler Relat Disord",
      "year": 2021,
      "doi": "10.1016/j.msard.2021.103332",
      "pmid": "35158426",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub41",
      "title": "Unilateral Relapsing Primary Angiitis of the CNS: An Entity Suggesting Differences in the Immune Response Between the Cerebral Hemispheres.",
      "authors": "AbdelRazek MA, Hillis JM, Guo Y, Martinez-Lage M, Gholipour T, Sloane J, Cho T, Matiello M",
      "journal": "Neurol Neuroimmunol Neuroinflamm",
      "year": 2021,
      "pmid": "33402525",
      "researchGroup": "CNS Vasculitis",
      "featured": true
  },
  {
      "id": "pub42",
      "title": "\"Rocking the boat\" with a new drug for neuromyelitis optica spectrum disorder.",
      "authors": "Levy M, Lechner-Scott J, Hawkes C, Giovannoni G",
      "journal": "Mult Scler Relat Disord",
      "year": 2020,
      "pmid": "33303201",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub43",
      "title": "A Case of Bilaterally Synchronized Faciobrachial Dystonic Seizures in Anti-Leucine-Rich Glioma Inactivated-1 Encephalitis.",
      "authors": "Mikami T, Amano E, Iizuka T, Machida A",
      "journal": "Mov Disord Clin Pract",
      "year": 2020,
      "doi": "10.1002/mdc3.12934",
      "pmid": "32373669",
      "researchGroup": "Autoimmune Encephalitis"
  },
  {
      "id": "pub44",
      "title": "Eastern equine encephalitis and use of IV immunoglobulin therapy and high-dose steroids.",
      "authors": "Wilcox DR, Collens SI, Solomon IH, Mateen FJ, Mukerji SS",
      "journal": "Neurol Neuroimmunol Neuroinflamm",
      "year": 2020,
      "doi": "10.1212/NXI.0000000000000917",
      "pmid": "33172962",
      "researchGroup": "Autoimmune Encephalitis"
  },
  {
      "id": "pub45",
      "title": "Interleukin-6 receptor blockade for the treatment of NMOSD.",
      "authors": "Levy M",
      "journal": "Lancet Neurol",
      "year": 2020,
      "pmid": "32333886",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub46",
      "title": "New therapies for neuromyelitis optica spectrum disorder.",
      "authors": "Levy M, Fujihara K, Palace J",
      "journal": "Lancet Neurol",
      "year": 2020,
      "pmid": "33186537",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub47",
      "title": "Tenofovir prodrugs potently inhibit Epstein-Barr virus lytic DNA replication by targeting the viral DNA polymerase.",
      "authors": "Drosu NC, Edelman ER, Housman DE",
      "journal": "Proc Natl Acad Sci U S A",
      "year": 2020,
      "doi": "10.1073/pnas.2002392117",
      "pmid": "32409608",
      "researchGroup": "EBV and MS"
  },
  {
      "id": "pub48",
      "title": "A pilot safety study of ublituximab, a monoclonal antibody against CD20, in acute relapses of neuromyelitis optica spectrum disorder.",
      "authors": "Mealy MA, Levy M",
      "journal": "Medicine (Baltimore)",
      "year": 2019,
      "doi": "10.1097/MD.0000000000015944",
      "pmid": "31232925",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub49",
      "title": "Assessment of Patients with Neuromyelitis Optica Spectrum Disorder Using the EQ-5D.",
      "authors": "Mealy MA, Boscoe A, Caro J, Levy M",
      "journal": "Int J MS Care",
      "year": 2019,
      "doi": "10.7224/1537-2073.2017-076",
      "pmid": "31191178",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub50",
      "title": "Autoantibodies in neuropsychiatric lupus: still looking.",
      "authors": "Bhattacharyya S",
      "journal": "Rheumatology (Oxford)",
      "year": 2019,
      "doi": "10.1093/rheumatology/key354",
      "pmid": "30597117",
      "researchGroup": "Autoimmune Encephalitis"
  },
  {
      "id": "pub51",
      "title": "Clinical characteristics of myelin oligodendrocyte glycoprotein antibody neuromyelitis optica spectrum disorder.",
      "authors": "Salama S, Pardo S, Levy M",
      "journal": "Mult Scler Relat Disord",
      "year": 2019,
      "pmid": "30825703",
      "researchGroup": "MOGAD"
  },
  {
      "id": "pub52",
      "title": "Clinical characteristics of myelin oligodendrocyte glycoprotein antibody neuromyelitis optica spectrum disorder.",
      "authors": "Salama S, Pardo S, Levy M",
      "journal": "Mult Scler Relat Disord",
      "year": 2019,
      "pmid": "30825703",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub53",
      "title": "Expanding the spectrum of MOG antibody disease.",
      "authors": "Levy M",
      "journal": "Mult Scler",
      "year": 2019,
      "doi": "10.1177/1352458519841824",
      "pmid": "30931729",
      "researchGroup": "MOGAD"
  },
  {
      "id": "pub54",
      "title": "MOG antibody-associated encephalomyelitis/encephalitis.",
      "authors": "Salama S, Khan M, Pardo S, Izbudak I, Levy M",
      "journal": "Mult Scler",
      "year": 2019,
      "doi": "10.1177/1352458519837705",
      "pmid": "30907249",
      "researchGroup": "MOGAD"
  },
  {
      "id": "pub55",
      "title": "MOG antibody-associated encephalomyelitis/encephalitis.",
      "authors": "Salama S, Khan M, Pardo S, Izbudak I, Levy M",
      "journal": "Mult Scler",
      "year": 2019,
      "doi": "10.1177/1352458519837705",
      "pmid": "30907249",
      "researchGroup": "Autoimmune Encephalitis"
  },
  {
      "id": "pub56",
      "title": "MOG-IgG myelitis coexisting with systemic lupus erythematosus in the post-partum setting.",
      "authors": "Bilodeau PA, Kumar V, Rodriguez AE, Li CT, Sanchez-Alvarez C, Thanarajasingam U, Zalewski NL, Flanagan EP",
      "journal": "Mult Scler",
      "year": 2019,
      "doi": "10.1177/1352458519872895",
      "pmid": "31621483",
      "researchGroup": "MOGAD"
  },
  {
      "id": "pub57",
      "title": "Neuroimmunology, Bielekova B, Birnbaum G, and Lisak RP eds",
      "authors": "Bhattacharyya S, Samuels MA",
      "journal": "Neurologic Complications of Systemic Autoimmune Diseases",
      "year": 2019,
      "researchGroup": "Autoimmune Encephalitis"
  },
  {
      "id": "pub58",
      "title": "Review of Treatment for Central Spinal Neuropathic Pain and Its Effect on Quality of Life: Implications for Neuromyelitis Optica Spectrum Disorder.",
      "authors": "Mealy MA, Kozachik SL, Levy M",
      "journal": "Pain Manag Nurs",
      "year": 2019,
      "doi": "10.1016/j.pmn.2019.03.003",
      "pmid": "31103517",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub59",
      "title": "Teaching NeuroImages: Corkscrew medullary veins in active neurosarcoidosis.",
      "authors": "Caton MT, Yau WW, Huang RY, Bhattacharyya S",
      "journal": "Neurology",
      "year": 2019,
      "doi": "10.1212/WNL.0000000000008460",
      "pmid": "31685713",
      "researchGroup": "Neurosarcoidosis",
      "featured": true
  },
  {
      "id": "pub60",
      "title": "Clinical and radiological characteristics of neuromyelitis optica spectrum disorder in the North Egyptian Nile Delta.",
      "authors": "Salama S, Marouf H, Ihab Reda M, Mansour AR, ELKholy O, Levy M",
      "journal": "J Neuroimmunol",
      "year": 2018,
      "doi": "10.1016/j.jneuroim.2018.08.014",
      "pmid": "30199734",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub61",
      "title": "Could antiretrovirals be treating EBV in MS? A case report.",
      "authors": "Drosu NC, Edelman ER, Housman DE",
      "journal": "Mult Scler Relat Disord",
      "year": 2018,
      "pmid": "29510325",
      "researchGroup": "EBV and MS"
  },
  {
      "id": "pub62",
      "title": "Effect of CXCR2 Inhibition on Behavioral Outcomes and Pathology in Rat Model of Neuromyelitis Optica.",
      "authors": "Jones MV, Levy M",
      "journal": "J Immunol Res",
      "year": 2018,
      "doi": "10.1155/2018/9034695",
      "pmid": "30648122",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub63",
      "title": "Investigational drugs in development to prevent neuromyelitis optica relapses.",
      "authors": "Paul F, Murphy O, Pardo S, Levy M",
      "journal": "Expert Opin Investig Drugs",
      "year": 2018,
      "doi": "10.1080/13543784.2018.1443077",
      "pmid": "29465257",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub64",
      "title": "Long-term disability in neuromyelitis optica spectrum disorder with a history of myelitis is associated with age at onset, delay in diagnosis/preventive treatment, MRI lesion length and presence of symptomatic brain lesions.",
      "authors": "Mealy MA, Mossburg SE, Kim SH, Messina S, Borisow N, Lopez-Gonzalez R, Ospina JP, Scheel M, Yeshokumar AK, Awad A, Leite MI, Arango JJ, Paul F, Palace J, Kim HJ, Levy M",
      "journal": "Mult Scler Relat Disord",
      "year": 2018,
      "doi": "10.1016/j.msard.2018.12.011",
      "pmid": "30554040",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub65",
      "title": "MOG antibody disease: A review of MOG antibody seropositive neuromyelitis optica spectrum disorder.",
      "authors": "Narayan R, Simpson A, Fritsche K, Salama S, Pardo S, Mealy M, Paul F, Levy M",
      "journal": "Mult Scler Relat Disord",
      "year": 2018,
      "pmid": "30048919",
      "researchGroup": "MOGAD"
  },
  {
      "id": "pub66",
      "title": "MOG antibody disease: A review of MOG antibody seropositive neuromyelitis optica spectrum disorder.",
      "authors": "Narayan R, Simpson A, Fritsche K, Salama S, Pardo S, Mealy M, Paul F, Levy M",
      "journal": "Mult Scler Relat Disord",
      "year": 2018,
      "pmid": "30048919",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub67",
      "title": "Mortality in neuromyelitis optica is strongly associated with African ancestry.",
      "authors": "Mealy MA, Kessler RA, Rimler Z, Reid A, Totonis L, Cutter G, Kister I, Levy M",
      "journal": "Neurol Neuroimmunol Neuroinflamm",
      "year": 2018,
      "pmid": "29892608",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub68",
      "title": "Outcomes from acute attacks of neuromyelitis optica spectrum disorder correlate with severity of attack, age and delay to treatment.",
      "authors": "Banerjee A, Ng J, Coleman J, Ospina JP, Mealy M, Levy M",
      "journal": "Mult Scler Relat Disord",
      "year": 2018,
      "doi": "10.1016/j.msard.2018.12.010",
      "pmid": "30554039",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub69",
      "title": "Plasmapheresis for acute attacks in neuromyelitis optica spectrum disorders.",
      "authors": "Levy M",
      "journal": "Neurol Neuroimmunol Neuroinflamm",
      "year": 2018,
      "doi": "10.1212/NXI.0000000000000510",
      "pmid": "30345335",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub70",
      "title": "Refining the Nosology of Antigen-Specific Diseases Within the Spectrum of Neuromyelitis Optica.",
      "authors": "Levy M, Giovannoni G, Hawkes C, Waubant E",
      "journal": "Mult Scler Relat Disord",
      "year": 2018,
      "doi": "10.1016/j.msard.2018.09.027",
      "pmid": "30384960",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub71",
      "title": "Vaccines and the association with relapses in patients with neuromyelitis optica spectrum disorder.",
      "authors": "Mealy MA, Cook LJ, Pache F, Velez DL, Borisow N, Becker D, Arango JAJ, Paul F, Levy M",
      "journal": "Mult Scler Relat Disord",
      "year": 2018,
      "doi": "10.1016/j.msard.2018.05.003",
      "pmid": "29783157",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub72",
      "title": "Anti-aquaporin-4 titer is not predictive of disease course in neuromyelitis optica spectrum disorder: A multicenter cohort study.",
      "authors": "Kessler RA, Mealy MA, Jimenez-Arango JA, Quan C, Paul F, López R, Hopkins S, Levy M",
      "journal": "Mult Scler Relat Disord",
      "year": 2017,
      "pmid": "29055457",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub73",
      "title": "Aquaporin-4 serostatus does not predict response to immunotherapy in neuromyelitis optica spectrum disorders.",
      "authors": "Mealy MA, Kim SH, Schmidt F, López R, Jimenez Arango JA, Paul F, Wingerchuk DM, Greenberg BM, Kim HJ, Levy M",
      "journal": "Mult Scler",
      "year": 2017,
      "doi": "10.1177/1352458517730131",
      "pmid": "28857723",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub74",
      "title": "Evaluation of comorbidities and health care resource use among patients with highly active neuromyelitis optica.",
      "authors": "Ajmera MR, Boscoe A, Mauskopf J, Candrilli SD, Levy M",
      "journal": "J Neurol Sci",
      "year": 2017,
      "doi": "10.1016/j.jns.2017.11.022",
      "pmid": "29249387",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub75",
      "title": "Female hormonal exposures and neuromyelitis optica symptom onset in a multicenter study.",
      "authors": "Bove R, Elsone L, Alvarez E, Borisow N, Cortez MM, Mateen FJ, Mealy MA, Mutch K, Tobyne S, Ruprecht K, Buckle G, Levy M, Wingerchuk DM, Paul F, Cross AH, Weinshenker B, Jacob A, Klawiter EC, Chitnis T",
      "journal": "Neurol Neuroimmunol Neuroinflamm",
      "year": 2017,
      "doi": "10.1212/NXI.0000000000000339",
      "pmid": "28382320",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub76",
      "title": "Early indicators of relapses vs pseudorelapses in neuromyelitis optica spectrum disorder.",
      "authors": "Kessler RA, Mealy MA, Levy M",
      "journal": "Neurol Neuroimmunol Neuroinflamm",
      "year": 2016,
      "pmid": "27508210",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub77",
      "title": "Insufficient treatment of severe depression in neuromyelitis optica spectrum disorder.",
      "authors": "Chavarro VS, Mealy MA, Simpson A, Lacheta A, Pache F, Ruprecht K, Gold SM, Paul F, Brandt AU, Levy M",
      "journal": "Neurol Neuroimmunol Neuroinflamm",
      "year": 2016,
      "doi": "10.1212/NXI.0000000000000286",
      "pmid": "27800532",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub78",
      "title": "Primary angiitis of the central nervous system: avoiding misdiagnosis and missed diagnosis of a rare disease.",
      "authors": "Bhattacharyya S, Berkowitz AL",
      "journal": "Pract Neurol",
      "year": 2016,
      "pmid": "26837371",
      "researchGroup": "CNS Vasculitis",
      "featured": true
  },
  {
      "id": "pub79",
      "title": "Spinal Movement Disorders in Neuromyelitis Optica: An Under-recognized Phenomenon.",
      "authors": "Abboud H, Fernandez HH, Mealy MA, Levy M",
      "journal": "Mov Disord Clin Pract",
      "year": 2016,
      "doi": "10.1002/mdc3.12321",
      "pmid": "30838252",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub80",
      "title": "The Type I Interferon Response Determines Differences in Choroid Plexus Susceptibility between Newborns and Adults in Herpes Simplex Virus Encephalitis.",
      "authors": "Wilcox DR, Folmsbee SS, Muller WJ, Longnecker R",
      "journal": "mBio",
      "year": 2016,
      "doi": "10.1128/mBio.00437-16",
      "pmid": "27073094",
      "researchGroup": "Autoimmune Encephalitis"
  },
  {
      "id": "pub81",
      "title": "Treatment of Neuromyelitis Optica Spectrum Disorder: Acute, Preventive, and Symptomatic.",
      "authors": "Kessler RA, Mealy MA, Levy M",
      "journal": "Curr Treat Options Neurol",
      "year": 2016,
      "doi": "10.1007/s11940-015-0387-9",
      "pmid": "26705758",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub82",
      "title": "Bevacizumab is safe in acute relapses of neuromyelitis optica.",
      "authors": "Mealy MA, Shin K, John G, Levy M",
      "journal": "Clin Exp Neuroimmunol",
      "year": 2015,
      "doi": "10.1111/cen3.12239",
      "pmid": "26834844",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub83",
      "title": "Differential reliance on autophagy for protection from HSV encephalitis between newborns and adults.",
      "authors": "Wilcox DR, Wadhwani NR, Longnecker R, Muller WJ",
      "journal": "PLoS Pathog",
      "year": 2015,
      "pmid": "25569138",
      "researchGroup": "Autoimmune Encephalitis"
  },
  {
      "id": "pub84",
      "title": "Favorable outcome of granulocyte colony-stimulating factor use in neuromyelitis optica patients presenting with agranulocytosis in the setting of rituximab.",
      "authors": "Mealy MA, Levy M",
      "journal": "J Neuroimmunol",
      "year": 2015,
      "doi": "10.1016/j.jneuroim.2015.08.003",
      "pmid": "26439958",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub85",
      "title": "Longitudinally extensive optic neuritis as an MRI biomarker distinguishes neuromyelitis optica from multiple sclerosis.",
      "authors": "Mealy MA, Whetstone A, Orman G, Izbudak I, Calabresi PA, Levy M",
      "journal": "J Neurol Sci",
      "year": 2015,
      "doi": "10.1016/j.jns.2015.05.013",
      "pmid": "26026942",
      "researchGroup": "MOGAD"
  },
  {
      "id": "pub86",
      "title": "Longitudinally extensive optic neuritis as an MRI biomarker distinguishes neuromyelitis optica from multiple sclerosis.",
      "authors": "Mealy MA, Whetstone A, Orman G, Izbudak I, Calabresi PA, Levy M",
      "journal": "J Neurol Sci",
      "year": 2015,
      "doi": "10.1016/j.jns.2015.05.013",
      "pmid": "26026942",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub87",
      "title": "Pathogenic aquaporin-4 reactive T cells are sufficient to induce mouse model of neuromyelitis optica.",
      "authors": "Jones MV, Huang H, Calabresi PA, Levy M",
      "journal": "Acta Neuropathol Commun",
      "year": 2015,
      "pmid": "25990016",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub88",
      "title": "The ethics of placebo controlled clinical trials in NMO - A balance of risks.",
      "authors": "Levy M",
      "journal": "Mult Scler Relat Disord",
      "year": 2015,
      "pmid": "26590656",
      "researchGroup": "NMOSD"
  },
  {
      "id": "pub89",
      "title": "Treatment of acute relapses in neuromyelitis optica: Steroids alone versus steroids plus plasma exchange.",
      "authors": "Abboud H, Petrak A, Mealy M, Sasidharan S, Siddique L, Levy M",
      "journal": "Mult Scler",
      "year": 2015,
      "doi": "10.1177/1352458515581438",
      "pmid": "25921047",
      "researchGroup": "NMOSD"
  },
]
