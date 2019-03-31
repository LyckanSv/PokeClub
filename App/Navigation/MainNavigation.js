import { createSwitchNavigator, createAppContainer } from "react-navigation";
import LoginNavigation from "./LoginNavigation";
import HomeNavigation from "./HomeNavigation";
import LoadPage from "../Pages/LoadPage/LoadPage";

const mainNavigator = createSwitchNavigator(
  {
    LoadPage,
    LoginNavigation,
    HomeNavigation
  },
  { initialRouteName: "LoadPage" }
);

export default createAppContainer(mainNavigator);
