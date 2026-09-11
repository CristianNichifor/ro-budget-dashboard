import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { CitizenSlice } from "./routes/CitizenSlice";
import { DefaultError } from "./routes/DefaultError";
import { NationalBalance } from "./routes/NationalBalance";
import { RootLayout } from "./routes/RootLayout";

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

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
