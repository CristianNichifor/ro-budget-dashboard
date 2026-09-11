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

const routeTree = rootRoute.addChildren([
  indexRoute,
  citizenSliceRoute,
  nationalBalanceRoute,
  companiesRoute,
  economyRoute,
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
