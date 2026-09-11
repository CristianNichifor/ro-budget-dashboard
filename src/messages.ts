import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";

/**
 * Message catalog (source locale: ro). Messages are declared with the
 * Lingui `msg` macro so `lingui extract` can generate .po catalogs.
 */
export const m = {
  "app.title": msg({ id: "app.title", message: "Bugetul României" }),
  "app.subtitle": msg({
    id: "app.subtitle",
    message: "Tablou de bord cetățenesc — buget consolidat 2026",
  }),
  "app.dataNote": msg({
    id: "app.dataNote",
    message: "Date statice demo — integrare API în faza P2",
  }),
  "app.footer": msg({
    id: "app.footer",
    message:
      "Demo educațional — valorile sunt aproximative și provin din date statice; sursele oficiale sunt afișate pe fiecare grafic.",
  }),
  "app.loading": msg({ id: "app.loading", message: "Se încarcă…" }),
  "nav.citizenSlice": msg({ id: "nav.citizenSlice", message: "Feliuța ta" }),
  "nav.nationalBalance": msg({
    id: "nav.nationalBalance",
    message: "Bilanțul național",
  }),
  "salary.title": msg({ id: "salary.title", message: "Situația ta fiscală" }),
  "salary.description": msg({
    id: "salary.description",
    message:
      "Câți bani din costul muncii tale ajung la stat și câți îți rămân.",
  }),
  "salary.grossLabel": msg({
    id: "salary.grossLabel",
    message: "Salariu brut (lei/lună)",
  }),
  "salary.perMonth": msg({ id: "salary.perMonth", message: "/ lună" }),
  "salary.rateNote": msg({
    id: "salary.rateNote",
    message: "Ratele folosite sunt cele ale bugetului 2026.",
  }),
  "salary.netStat": msg({ id: "salary.netStat", message: "Îți rămân" }),
  "salary.stateShareStat": msg({
    id: "salary.stateShareStat",
    message: "Ia statul",
  }),
  "salary.effectiveRate": msg({
    id: "salary.effectiveRate",
    message: "Povară fiscală efectivă",
  }),
  "salary.vsAverage": msg({
    id: "salary.vsAverage",
    message: "față de salariul mediu net (INS)",
  }),
  "salary.entry.gross": msg({
    id: "salary.entry.gross",
    message: "Cost total angajator",
  }),
  "salary.entry.employerContribution": msg({
    id: "salary.entry.employerContribution",
    message: "Contribuție angajator (CAM 2,25%)",
  }),
  "salary.entry.cas": msg({
    id: "salary.entry.cas",
    message: "CAS — pensii (25%)",
  }),
  "salary.entry.cass": msg({
    id: "salary.entry.cass",
    message: "CASS — sănătate (10%)",
  }),
  "salary.entry.incomeTax": msg({
    id: "salary.entry.incomeTax",
    message: "Impozit pe venit (10%)",
  }),
  "salary.entry.estimatedVat": msg({
    id: "salary.entry.estimatedVat",
    message: "TVA estimat (consum)",
  }),
  "salary.entry.net": msg({ id: "salary.entry.net", message: "Net salariat" }),
  "realWage.title": msg({
    id: "realWage.title",
    message: "Salariul real vs. nominal",
  }),
  "realWage.description": msg({
    id: "realWage.description",
    message:
      "Salariul net nominal (INS) ajustat cu inflația (BNR). Când linia roșie scade sub cea albastră, puterea de cumpărare crește mai încet decât salariul.",
  }),
  "realWage.nominal": msg({
    id: "realWage.nominal",
    message: "Salariu net nominal",
  }),
  "realWage.real": msg({
    id: "realWage.real",
    message: "Salariu real (ajustat la inflație)",
  }),
  "balance.title": msg({
    id: "balance.title",
    message: "Venituri și cheltuieli",
  }),
  "balance.description": msg({
    id: "balance.description",
    message:
      "Bugetul consolidat 2026: venituri, cheltuieli și deficit, pe modelul Open Budget.",
  }),
  "balance.kpi.revenue": msg({
    id: "balance.kpi.revenue",
    message: "Venituri",
  }),
  "balance.kpi.expenditure": msg({
    id: "balance.kpi.expenditure",
    message: "Cheltuieli",
  }),
  "balance.kpi.deficit": msg({ id: "balance.kpi.deficit", message: "Deficit" }),
  "balance.kpi.deficitGdp": msg({
    id: "balance.kpi.deficitGdp",
    message: "Deficit (% PIB)",
  }),
  "balance.debtGauge.reference": msg({
    id: "balance.debtGauge.reference",
    message: "Referință UE (Maastricht): 3% din PIB",
  }),
  "sankey.title": msg({
    id: "sankey.title",
    message: "De unde vin banii și unde se duc",
  }),
  "sankey.description": msg({
    id: "sankey.description",
    message:
      "Fluxul banilor publici: surse de venit → buget consolidat → destinații. Deficitul apare ca sursă (împrumut).",
  }),
  "sankey.node.revenue": msg({
    id: "sankey.node.revenue",
    message: "Venituri",
  }),
  "sankey.node.deficit": msg({
    id: "sankey.node.deficit",
    message: "Deficit (împrumut)",
  }),
  "sankey.node.budget": msg({
    id: "sankey.node.budget",
    message: "Buget consolidat",
  }),
  "sankey.node.rest": msg({
    id: "sankey.node.rest",
    message: "Alte destinații",
  }),
  "treemap.title": msg({
    id: "treemap.title",
    message: "Destinația cheltuielilor",
  }),
  "treemap.description": msg({
    id: "treemap.description",
    message:
      "Suprafața fiecărui dreptunghi este proporțională cu suma alocată.",
  }),
  "context.title": msg({
    id: "context.title",
    message: "Context din statisticile INS",
  }),
  "context.description": msg({
    id: "context.description",
    message:
      "Bugetul sănătății (bare, mld. lei) alături de un indicator social (linie): banii alocați vs. rezultatul măsurabil.",
  }),
  "context.budgetLegend": msg({
    id: "context.budgetLegend",
    message: "Buget sănătate (mld. lei)",
  }),
  "context.metricLabel": msg({
    id: "context.metricLabel",
    message: "Indicator urmărit",
  }),
  "context.insight": msg({
    id: "context.insight",
    message:
      "Față de 2021, bugetul sănătății s-a modificat cu {budgetChange}; indicatorul „{insLabel}”: {insChange}.",
  }),
  "drilldown.breadcrumb.root": msg({
    id: "drilldown.breadcrumb.root",
    message: "Bilanțul național",
  }),
  "drilldown.breadcrumb.destinations": msg({
    id: "drilldown.breadcrumb.destinations",
    message: "Destinații",
  }),
  "drilldown.title": msg({
    id: "drilldown.title",
    message: "Structura instituțională: {destination}",
  }),
  "drilldown.description": msg({
    id: "drilldown.description",
    message:
      "Instituțiile finanțate din această destinație, cu ponderea fiecăreia în total.",
  }),
  "drilldown.loading": msg({
    id: "drilldown.loading",
    message: "Se încarcă instituțiile…",
  }),
  "drilldown.error": msg({
    id: "drilldown.error",
    message: "Nu am putut încărca instituțiile — încearcă din nou.",
  }),
  "drilldown.empty": msg({
    id: "drilldown.empty",
    message: "Fără instituții listate pentru această destinație.",
  }),
  "drilldown.share": msg({
    id: "drilldown.share",
    message: "{sharePercent} din total",
  }),
  "drilldown.total": msg({ id: "drilldown.total", message: "Total" }),
  "drilldown.close": msg({ id: "drilldown.close", message: "Închide" }),
  "investments.title": msg({
    id: "investments.title",
    message: "Investiții publice pe județe",
  }),
  "investments.description": msg({
    id: "investments.description",
    message:
      "Programul de investiții 2026, pe județe. Cartogramă: suprafața = suma alocată, culoarea = intensitatea față de celelalte județe.",
  }),
  "investments.shareOfTotal": msg({
    id: "investments.shareOfTotal",
    message: "{sharePercent} din total",
  }),
  "investments.legendMin": msg({
    id: "investments.legendMin",
    message: "mai puțin",
  }),
  "investments.legendMax": msg({
    id: "investments.legendMax",
    message: "mai mult",
  }),
  "source.demo": msg({ id: "source.demo", message: "Demo" }),
  "error.title": msg({ id: "error.title", message: "Ceva nu a mers bine" }),
  "error.reload": msg({
    id: "error.reload",
    message: "Reîncarcă pagina sau încearcă din nou mai târziu.",
  }),
  "source.ins": msg({ id: "source.ins", message: "Sursă: INS Tempo" }),
  "source.bnr": msg({ id: "source.bnr", message: "Sursă: BNR" }),
  "source.budget": msg({
    id: "source.budget",
    message: "Sursă: Buget consolidat 2026",
  }),
} satisfies Record<string, MessageDescriptor>;

export type MessageId = keyof typeof m;

export function lookupMessage(id: string): MessageDescriptor {
  return (m as Record<string, MessageDescriptor>)[id] ?? { id };
}
