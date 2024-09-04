import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <App />
      </Provider>
    </PersistGate>
  </StrictMode>
);
