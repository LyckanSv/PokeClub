import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginPage from "../Pages/LoginPage/LoginPage";
import SignUpScreen from "../Pages/SignUpScreen/SignUpScreen";

const loginNavigator = createStackNavigator(
  {
    LoginPage: {
      screen: LoginPage
    },
    SignUpScreen: {
      screen: SignUpScreen
    }
  },
  { headerMode: "none" }
);

export default createAppContainer(loginNavigator);
