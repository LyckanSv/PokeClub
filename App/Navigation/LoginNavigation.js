import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginPage from "../Pages/LoginPage/LoginPage";
import SignUpScreen from "../Pages/SignUpScreen/SignUpScreen";
import RegionsScreen from "../Pages/RegionsScreen/RegionsScreen";
import TeamsScreen from "../Pages/TeamsScreen/TeamsScreen";
import TeamScreen from "../Pages/TeamScreen/TeamScreen";

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
    },
    TeamsScreen: {
      screen: TeamsScreen
    },
    TeamScreen: {
      screen: TeamScreen
    }
  },
  { headerMode: "none" }
);

export default createAppContainer(loginNavigator);
