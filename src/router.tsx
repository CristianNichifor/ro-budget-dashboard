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

const routeTree = rootRoute.addChildren([
  indexRoute,
  citizenSliceRoute,
  nationalBalanceRoute,
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
