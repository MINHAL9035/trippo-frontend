import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/theme-provider";
import { Toaster } from "sonner";
import AppRoutes from "./routes/AppRoutes";
import { FormProvider } from "./context/FormContext";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <FormProvider>
            <AppRoutes />
            <Toaster
              position="top-right"
              expand={false}
              richColors
              theme="light"
              closeButton={true}
            />
          </FormProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
