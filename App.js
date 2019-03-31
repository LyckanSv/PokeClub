import React from "react";
import { Provider } from "react-redux";
import { StyleProvider } from "native-base";
import MainNavigation from "./App/Navigation/MainNavigation";
import createStore from "./App/Redux";
import getTheme from "./native-base-theme/components";
import theme from "./native-base-theme/variables/commonColor";

const store = createStore();

const App = () => {
  return (
    <Provider store={store}>
      <StyleProvider style={getTheme(theme)}>
        <MainNavigation />
      </StyleProvider>
    </Provider>
  );
};

export default App;
