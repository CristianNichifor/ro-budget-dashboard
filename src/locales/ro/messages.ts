import type { Messages } from "@lingui/core";

export const messages: Messages = {
  "app.title": "Bugetul României",
  "app.subtitle": "Tablou de bord cetățenesc — buget consolidat 2026",
  "app.dataNote": "Date statice demo — integrare API în faza P2",

  "nav.citizenSlice": "Feliuța ta",
  "nav.nationalBalance": "Bilanțul național",

  "salary.title": "Situația ta fiscală",
  "salary.description":
    "Câți bani din costul muncii tale ajung la stat și câți îți rămân.",
  "salary.grossLabel": "Salariu brut (lei/lună)",
  "salary.netStat": "Îți rămân",
  "salary.stateShareStat": "Ia statul",
  "salary.effectiveRate": "Povară fiscală efectivă",
  "salary.vsAverage": "față de salariul mediu net (INS)",
  "salary.entry.gross": "Cost total angajator",
  "salary.entry.employerContribution": "Contribuție angajator (CAM 2,25%)",
  "salary.entry.cas": "CAS — pensii (25%)",
  "salary.entry.cass": "CASS — sănătate (10%)",
  "salary.entry.incomeTax": "Impozit pe venit (10%)",
  "salary.entry.estimatedVat": "TVA estimat (consum)",
  "salary.entry.net": "Net salariat",

  "realWage.title": "Salariul real vs. nominal",
  "realWage.description":
    "Salariul net nominal (INS) ajustat cu inflația (BNR). Când linia roșie scade sub cea albastră, puterea de cumpărare crește mai încet decât salariul.",
  "realWage.nominal": "Salariu net nominal",
  "realWage.real": "Salariu real (ajustat la inflație)",

  "balance.title": "Venituri și cheltuieli",
  "balance.description":
    "Bugetul consolidat 2026: venituri, cheltuieli și deficit, pe modelul Open Budget.",
  "balance.kpi.revenue": "Venituri",
  "balance.kpi.expenditure": "Cheltuieli",
  "balance.kpi.deficit": "Deficit",
  "balance.kpi.deficitGdp": "Deficit (% PIB)",
  "balance.debtGauge.reference": "Referință UE (Maastricht): 3% din PIB",

  "sankey.title": "De unde vin banii și unde se duc",
  "sankey.description":
    "Fluxul banilor publici: surse de venit → buget consolidat → destinații. Deficitul apare ca sursă (împrumut).",

  "treemap.title": "Destinația cheltuielilor",
  "treemap.description":
    "Suprafața fiecărui dreptunghi este proporțională cu suma alocată.",

  "source.demo": "Demo",
  "source.ins": "Sursă: INS Tempo",
  "source.bnr": "Sursă: BNR",
  "source.budget": "Sursă: Buget consolidat 2026",
};
