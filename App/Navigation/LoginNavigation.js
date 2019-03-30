import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginPage from "../Pages/LoginPage/LoginPage";
import SignUpScreen from "../Pages/SignUpScreen/SignUpScreen";
import RegionsScreen from "../Pages/RegionsScreen/RegionsScreen";

const loginNavigator = createStackNavigator(
  {
    LoginPage: {
      screen: LoginPage
    },
    SignUpScreen: {
      screen: SignUpScreen
    },
    RegionsScreen: {
      screen: RegionsScreen
    }
  },
  { headerMode: "none" }
);

export default createAppContainer(loginNavigator);
