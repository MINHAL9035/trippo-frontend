import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import AppRouters from "./Routes/AppRouters";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <AppRouters />
          <ToastContainer />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
