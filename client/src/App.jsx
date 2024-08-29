import { BrowserRouter } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import MainRoutes from "./MainRoutes";

function App() {
  return (
    <BrowserRouter>
      <MainHeader />
      <MainRoutes />
    </BrowserRouter>
  );
}

export default App;
