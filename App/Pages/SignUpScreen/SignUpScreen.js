import React, { Component } from "react";
import Firebase from "react-native-firebase";
import { ImageBackground, Image } from "react-native";
import {
  Form,
  Button,
  Input,
  Item,
  Text,
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Icon,
  Title
} from "native-base";
import styles from "./SignUpScreenStyle";

const background = require("../../Assets/Images/background_login.png");
const logo = require("../../Assets/Images/logo.png");

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: "",
      passwordValue: "",
      repeatPasswordValue: "",
      error: null
    };
  }

  handleSignUp = (email, password) => {
    const { navigation } = this.props;
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => navigation.navigate("HomeNavigation"))
      .catch(error => this.setState({ error: error.message }));
  };

  headerBuilder = () => {
    const { navigation } = this.props;
    return (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Sign Up</Title>
        </Body>
        <Right />
      </Header>
    );
  };

  render() {
    const { emailValue, passwordValue, repeatPasswordValue } = this.state;
    const { navigation } = this.props;
    return (
      <Container>
        {this.headerBuilder()}
        <ImageBackground source={background} style={styles.imageBackground}>
          <Content>
            <Form style={styles.form}>
              <Image source={logo} style={styles.logo} resizeMode="contain" />
              <Item rounded style={styles.input}>
                <Input
                  placeholder="example@mail.com"
                  value={emailValue}
                  onChangeText={value => this.setState({ emailValue: value })}
                />
              </Item>
              <Item rounded style={styles.input} value={repeatPasswordValue}>
                <Input
                  placeholder="password"
                  onChangeText={value =>
                    this.setState({ repeatPasswordValue: value })
                  }
                  secureTextEntry
                />
              </Item>
              <Item rounded style={styles.input} value={passwordValue}>
                <Input
                  placeholder="repeat password"
                  onChangeText={value =>
                    this.setState({ passwordValue: value })
                  }
                  secureTextEntry
                />
              </Item>
              <Button
                rounded
                style={styles.button}
                onPress={() => {
                  this.handleSignUp(emailValue, passwordValue);
                }}
              >
                <Text>Sign Up</Text>
              </Button>
            </Form>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}
