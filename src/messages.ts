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
    message: "Tablou de bord cetățenesc — buget consolidat",
  }),
  "dataMode.live": msg({
    id: "dataMode.live",
    message: "Date live — API public",
  }),
  "dataMode.fallback": msg({
    id: "dataMode.fallback",
    message: "Date demo — API indisponibil",
  }),
  "dataMode.partial": msg({
    id: "dataMode.partial",
    message: "Date parțial demo",
  }),
  "lang.label": msg({ id: "lang.label", message: "Limbă" }),
  "sankey.ariaLabel": msg({
    id: "sankey.ariaLabel",
    message: "Fluxul banilor publici",
  }),
  "sankey.openDestination": msg({
    id: "sankey.openDestination",
    message: "Deschide destinația {destination}",
  }),
  "gauge.ariaLabel": msg({
    id: "gauge.ariaLabel",
    message: "Deficit {valuePercent} din PIB",
  }),
  "app.footer": msg({
    id: "app.footer",
    message:
      "Proiect educațional — datele provin din surse publice oficiale; sursa fiecărui grafic este afișată pe card.",
  }),
  "app.loading": msg({ id: "app.loading", message: "Se încarcă…" }),
  "nav.citizenSlice": msg({ id: "nav.citizenSlice", message: "Feliuța ta" }),
  "nav.economy": msg({ id: "nav.economy", message: "Economie" }),
  "economy.title": msg({
    id: "economy.title",
    message: "Economia României în date",
  }),
  "economy.description": msg({
    id: "economy.description",
    message:
      "Inflație, șomaj și cursul de schimb — indicatori lunari din surse europene oficiale.",
  }),
  "economy.kpi.inflation": msg({
    id: "economy.kpi.inflation",
    message: "Inflație anuală",
  }),
  "economy.kpi.target": msg({ id: "economy.kpi.target", message: "Ținta BNR" }),
  "economy.kpi.unemployment": msg({
    id: "economy.kpi.unemployment",
    message: "Șomaj (BIM)",
  }),
  "economy.kpi.fx": msg({ id: "economy.kpi.fx", message: "EUR/RON" }),
  "economy.inflation.title": msg({
    id: "economy.inflation.title",
    message: "Inflația anuală (IAPC)",
  }),
  "economy.inflation.description": msg({
    id: "economy.inflation.description",
    message:
      "Rata anuală a inflației armonizate (Eurostat), cu ținta BNR marcată.",
  }),
  "economy.inflation.targetLine": msg({
    id: "economy.inflation.targetLine",
    message: "Ținta BNR",
  }),
  "economy.unemployment.title": msg({
    id: "economy.unemployment.title",
    message: "Rata șomajului",
  }),
  "economy.unemployment.description": msg({
    id: "economy.unemployment.description",
    message: "Șomaj BIM (15–74 ani), ajustat sezonier, % din populația activă.",
  }),
  "economy.fx.title": msg({
    id: "economy.fx.title",
    message: "Cursul EUR/RON",
  }),
  "economy.fx.description": msg({
    id: "economy.fx.description",
    message: "Cursul de referință zilnic al Băncii Centrale Europene.",
  }),
  "economy.percent": msg({ id: "economy.percent", message: "%" }),
  "economy.lei": msg({ id: "economy.lei", message: "lei" }),
  "source.eurostat": msg({ id: "source.eurostat", message: "Sursă: Eurostat" }),
  "source.ecb": msg({ id: "source.ecb", message: "Sursă: BCE" }),
  "nav.companies": msg({
    id: "nav.companies",
    message: "Companii de stat",
  }),
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
    message:
      "Calcul ilustrativ cu ratele fiscale ale bugetului 2026 — nu este consultanță fiscală.",
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
  // ── Companii de stat ──────────────────────────────────────────────────
  "soe.title": msg({
    id: "soe.title",
    message: "Companiile de stat ale României",
  }),
  "soe.description": msg({
    id: "soe.description",
    message:
      "Indicatori financiari, salarii și subvenții pentru companiile de stat — date publice, 2019–2024.",
  }),
  "soe.kpi.companies": msg({
    id: "soe.kpi.companies",
    message: "Companii de stat",
  }),
  "soe.kpi.revenue": msg({
    id: "soe.kpi.revenue",
    message: "Cifra de afaceri",
  }),
  "soe.kpi.profit": msg({
    id: "soe.kpi.profit",
    message: "Profit net",
  }),
  "soe.kpi.losses": msg({
    id: "soe.kpi.losses",
    message: "Pierderi nete",
  }),
  "soe.kpi.updated": msg({
    id: "soe.kpi.updated",
    message: "Date {year} · actualizat {date} · {companies} companii cu date",
  }),
  "soe.scatter.title": msg({
    id: "soe.scatter.title",
    message: "Salariu vs. performanță",
  }),
  "soe.scatter.description": msg({
    id: "soe.scatter.description",
    message:
      "Fiecare punct este o companie de stat: marja netă 2024 (orizontală) față de salariul maxim lunar din conducere (verticală). Clic pe un punct pentru fișa companiei.",
  }),
  "soe.scatter.x": msg({ id: "soe.scatter.x", message: "Marja netă (%)" }),
  "soe.scatter.y": msg({
    id: "soe.scatter.y",
    message: "Salariu maxim (lei/lună)",
  }),
  "soe.scatter.breakEven": msg({
    id: "soe.scatter.breakEven",
    message: "Pragul profitului",
  }),
  "soe.scatter.minWage": msg({
    id: "soe.scatter.minWage",
    message: "Salariu minim brut",
  }),
  "soe.scatter.open": msg({
    id: "soe.scatter.open",
    message: "Deschide fișa {company}",
  }),
  "soe.sectors.title": msg({
    id: "soe.sectors.title",
    message: "Companiile pe pierdere, pe sectoare",
  }),
  "soe.sectors.description": msg({
    id: "soe.sectors.description",
    message:
      "Ponderea companiilor pe pierdere în fiecare sector economic, 2019–2024.",
  }),
  "soe.sectors.y": msg({
    id: "soe.sectors.y",
    message: "Ponderea pe pierdere (%)",
  }),
  "soe.counties.title": msg({
    id: "soe.counties.title",
    message: "Companiile de stat pe județe",
  }),
  "soe.counties.description": msg({
    id: "soe.counties.description",
    message:
      "Dimensiunea pătratului = cifra de afaceri; nuanța = ponderea companiilor pe pierdere.",
  }),
  "soe.counties.lossPct": msg({
    id: "soe.counties.lossPct",
    message: "pe pierdere",
  }),
  "soe.subsidies.title": msg({
    id: "soe.subsidies.title",
    message: "Subvenții locale",
  }),
  "soe.subsidies.description": msg({
    id: "soe.subsidies.description",
    message:
      "Subvenții plătite de primării companiilor de stat — primii operatori ca valoare.",
  }),
  "soe.subsidies.total": msg({
    id: "soe.subsidies.total",
    message: "Total {year}: {total} lei",
  }),
  "soe.listed.title": msg({
    id: "soe.listed.title",
    message: "Companii de stat listate la BVB",
  }),
  "soe.listed.description": msg({
    id: "soe.listed.description",
    message:
      "Pachetele majoritare ale statului la Bursa de Valori București, cu evoluția prețului acțiunii.",
  }),
  "soe.listed.profit": msg({
    id: "soe.listed.profit",
    message: "Profit net consolidat",
  }),
  "soe.listed.state": msg({
    id: "soe.listed.state",
    message: "Stat: {percent}%",
  }),
  "soe.company.status": msg({
    id: "soe.company.status",
    message: "Status",
  }),
  "soe.company.sector": msg({ id: "soe.company.sector", message: "Sector" }),
  "soe.company.county": msg({ id: "soe.company.county", message: "Județ" }),
  "soe.company.marginHistory": msg({
    id: "soe.company.marginHistory",
    message: "Marja netă pe ani (%)",
  }),
  "soe.company.management": msg({
    id: "soe.company.management",
    message: "Conducere",
  }),
  "soe.company.mfin": msg({
    id: "soe.company.mfin",
    message: "Bilanț MFin 2024",
  }),
  "soe.company.ca": msg({ id: "soe.company.ca", message: "Cifra de afaceri" }),
  "soe.company.profit": msg({
    id: "soe.company.profit",
    message: "Profit net",
  }),
  "soe.company.loss": msg({
    id: "soe.company.loss",
    message: "Pierdere netă",
  }),
  "soe.company.employees": msg({
    id: "soe.company.employees",
    message: "Angajați",
  }),
  "soe.company.capital": msg({
    id: "soe.company.capital",
    message: "Capitaluri proprii",
  }),
  "soe.company.subsidy": msg({
    id: "soe.company.subsidy",
    message: "Subvenție 2025",
  }),
  "soe.company.close": msg({ id: "soe.company.close", message: "Închide" }),
  "soe.company.loading": msg({
    id: "soe.company.loading",
    message: "Se încarcă fișa companiei…",
  }),
  "soe.unavailable": msg({
    id: "soe.unavailable",
    message: "Sursa de date e indisponibilă momentan.",
  }),
  "soe.source": msg({ id: "soe.source", message: "companiidestat.ro" }),
} satisfies Record<string, MessageDescriptor>;

export type MessageId = keyof typeof m;

export function lookupMessage(id: string): MessageDescriptor {
  return (m as Record<string, MessageDescriptor>)[id] ?? { id };
}
