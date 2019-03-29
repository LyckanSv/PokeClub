import React, { Component } from "react";
import { ImageBackground, Image } from "react-native";
import { View, Form, Button, Input, Item, Text } from "native-base";
import styles from "./LoginPageStyle";

const background = require("../../Assets/Images/background_login.png");
const logo = require("../../Assets/Images/logo.png");

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: "",
      passwordValue: ""
    };
  }

  render() {
    const { emailValue, passwordValue } = this.state;
    const { navigation } = this.props;
    return (
      <ImageBackground source={background} style={styles.imageBackground}>
        <View style={styles.container}>
          <Form style={styles.form}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <Item rounded style={styles.input}>
              <Input
                placeholder="example@mail.com"
                value={emailValue}
                onChangeText={value => this.setState({ emailValue: value })}
              />
            </Item>
            <Item rounded style={styles.input} value={passwordValue}>
              <Input
                placeholder="password"
                onChangeText={value => this.setState({ passwordValue: value })}
                secureTextEntry
              />
            </Item>
            <Button rounded style={styles.button}>
              <Text style={{fontFamily: "Montserrat-Regular"}}>Login</Text>
            </Button>
            <Button
              transparent
              style={styles.button}
              onPress={() => navigation.navigate("SignUpScreen")}
            >
              <Text style={{fontFamily: "PlayfairDisplay-Regular"}}>Sign up</Text>
            </Button>
          </Form>
        </View>
      </ImageBackground>
    );
  }
}
