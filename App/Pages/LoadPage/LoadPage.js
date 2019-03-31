import React, { Component } from "react";
import { View } from "react-native";
import Firebase from "react-native-firebase";

export default class LoadPage extends Component {
  componentWillMount() {
    const { navigation } = this.props;
    Firebase.auth().onAuthStateChanged(user => {
      navigation.navigate(user ? "HomeNavigation" : "LoginNavigation");
    });
  }

  render() {
    return <View />;
  }
}
