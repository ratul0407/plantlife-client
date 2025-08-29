import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/Routing.jsx";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
// import { AuthProvider } from "./providers/AuthProvider.jsx";
import { LenisProvider } from "./layouts/LenisProvider.jsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.js";

// const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <AuthProvider> */}
    <ReduxProvider store={store}>
      <LenisProvider>
        <RouterProvider router={router} />
      </LenisProvider>
    </ReduxProvider>
    {/* </AuthProvider> */}
  </StrictMode>,
);
