import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "sonner";
import AppRoutes from "./routes/AppRoutes";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <AppRoutes />
          <Toaster
            position="top-right"
            expand={false}
            richColors
            theme="light"
            closeButton={true}
          />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
