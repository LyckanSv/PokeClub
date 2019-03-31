import React, { Component } from "react";
import { Provider } from "react-redux";
import firebase from "react-native-firebase";
import MainNavigation from "./App/Navigation/MainNavigation";
import createStore from "./App/Redux";

const store = createStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    );
  }
}

export default App;
