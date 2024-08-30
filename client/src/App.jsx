import { BrowserRouter } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import MainRoutes from "./MainRoutes";
import MainFooter from "./components/MainFooter";

function App() {
  return (
    <BrowserRouter>
      <MainHeader />
      <MainRoutes />
      <MainFooter />
    </BrowserRouter>
  );
}

export default App;
