import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router";
import { DefaultError } from "./routes/DefaultError";
import { RootLayout } from "./routes/RootLayout";
import { RoutePending } from "./routes/RoutePending";

const CitizenSlice = lazyRouteComponent(
  () => import("./routes/CitizenSlice"),
  "CitizenSlice"
);

const NationalBalance = lazyRouteComponent(
  () => import("./routes/NationalBalance"),
  "NationalBalance"
);

const CompaniiDeStat = lazyRouteComponent(
  () => import("./routes/CompaniiDeStat"),
  "CompaniiDeStat"
);

const Economie = lazyRouteComponent(
  () => import("./routes/Economie"),
  "Economie"
);

const Societate = lazyRouteComponent(
  () => import("./routes/Societate"),
  "Societate"
);

const Energie = lazyRouteComponent(() => import("./routes/Energie"), "Energie");

const PiataMuncii = lazyRouteComponent(
  () => import("./routes/PiataMuncii"),
  "PiataMuncii"
);

const rootRoute = createRootRoute({
  component: RootLayout,
  errorComponent: DefaultError,
  notFoundComponent: DefaultError,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/felia-ta" });
  },
});

const citizenSliceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/felia-ta",
  component: CitizenSlice,
});

const nationalBalanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bilantul-national",
  component: NationalBalance,
});

const companiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/companii-de-stat",
  component: CompaniiDeStat,
});

const economyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/economie",
  component: Economie,
});

const societyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/societate",
  component: Societate,
});

const energyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/energie",
  component: Energie,
});

const labourRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/piata-muncii",
  component: PiataMuncii,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  citizenSliceRoute,
  nationalBalanceRoute,
  companiesRoute,
  economyRoute,
  societyRoute,
  energyRoute,
  labourRoute,
]);

export const router = createRouter({
  routeTree,
  defaultPendingComponent: RoutePending,
  defaultPendingMs: 150,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
