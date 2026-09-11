import type { Messages } from "@lingui/core";

export const messages: Messages = {
  "app.title": "Romania's Budget",
  "app.subtitle": "Citizen dashboard — consolidated budget 2026",
  "app.dataNote": "Static demo data — API integration in phase P2",

  "nav.citizenSlice": "Your slice",
  "nav.nationalBalance": "National balance",

  "salary.title": "Your fiscal situation",
  "salary.description":
    "How much of your labour cost goes to the state and how much you keep.",
  "salary.grossLabel": "Gross salary (RON/month)",
  "salary.netStat": "You keep",
  "salary.stateShareStat": "The state takes",
  "salary.effectiveRate": "Effective fiscal burden",
  "salary.vsAverage": "vs. average net salary (INS)",
  "salary.entry.gross": "Total employer cost",
  "salary.entry.employerContribution": "Employer contribution (CAM 2.25%)",
  "salary.entry.cas": "CAS — pensions (25%)",
  "salary.entry.cass": "CASS — health (10%)",
  "salary.entry.incomeTax": "Income tax (10%)",
  "salary.entry.estimatedVat": "Estimated VAT (consumption)",
  "salary.entry.net": "Net salary",

  "realWage.title": "Real vs. nominal wage",
  "realWage.description":
    "Nominal net wage (INS) adjusted with inflation (BNR). When the red line lags the blue one, purchasing power grows slower than pay.",
  "realWage.nominal": "Nominal net wage",
  "realWage.real": "Real wage (inflation-adjusted)",

  "balance.title": "Revenue and expenditure",
  "balance.description":
    "Consolidated budget 2026: revenue, expenditure and deficit, following the Open Budget model.",
  "balance.kpi.revenue": "Revenue",
  "balance.kpi.expenditure": "Expenditure",
  "balance.kpi.deficit": "Deficit",
  "balance.kpi.deficitGdp": "Deficit (% GDP)",
  "balance.debtGauge.reference": "EU reference (Maastricht): 3% of GDP",

  "sankey.title": "Where the money comes from and goes",
  "sankey.description":
    "Public money flow: revenue sources → consolidated budget → destinations. The deficit appears as a source (borrowing).",

  "treemap.title": "Spending destinations",
  "treemap.description":
    "Each rectangle's area is proportional to the allocated amount.",

  "context.title": "Context from INS statistics",
  "context.description":
    "Health budget (bars, bn lei) next to a social indicator (line): money allocated vs. measurable outcome.",
  "context.budgetLegend": "Health budget (bn lei)",
  "context.insight":
    "Compared to 2021, the health budget changed by {budgetChange}, while {insLabel} changed by {insChange}.",

  "source.demo": "Demo",
  "source.ins": "Source: INS Tempo",
  "source.bnr": "Source: BNR",
  "source.budget": "Source: Consolidated budget 2026",
};
