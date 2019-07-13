import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "./configureStore";
import RoutesContainer from "./components/containers/RoutesContainer/RoutesContainer";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RoutesContainer />
      </PersistGate>
    </Provider>
  );
}

export default App;
