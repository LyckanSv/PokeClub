import { createStackNavigator } from "react-navigation";
import RegionsScreen from "../Pages/RegionsScreen/RegionsScreen";
import TeamsScreen from "../Pages/TeamsScreen/TeamsScreen";
import TeamScreen from "../Pages/TeamScreen/TeamScreen";
import PokedexScreen from "../Pages/PokedexScreen/PokedexScreen";

const homeNavigator = createStackNavigator(
  {
    RegionsScreen: {
      screen: RegionsScreen
    },
    TeamsScreen: {
      screen: TeamsScreen
    },
    TeamScreen: {
      screen: TeamScreen
    },
    PokedexScreen: {
      screen: PokedexScreen
    }
  },
  { headerMode: "none" }
);

export default homeNavigator;
