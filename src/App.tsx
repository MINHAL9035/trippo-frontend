import { ThemeProvider } from "./components/theme-provider";
import HomeScreen from "./pages/users/HomeScreen";
const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
       <HomeScreen/>
      </ThemeProvider>
    </>
  );
};

export default App;
