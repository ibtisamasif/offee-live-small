import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import Login from "../Containers/LoginFlow/login";
import Splash from "../Containers/splash";
import Tests from "../Containers/MainFlow/Tests/tests";
import MCQ from "../Containers/MainFlow/Tests/mcqScreen";
import Notification from "../Containers/MainFlow/Home/notification";
const AuthStack = createStackNavigator({
  login: {
    screen: Login
  }
});

const AppStack = createStackNavigator({
  drawer: {
    screen: Tests,
    navigationOptions: {
      header: null
    }
  },
  mcqScreen: {
    screen: MCQ,
    navigationOptions: {
      header: null
    }
  },
  notification: {
    screen: Notification
  }
});

export default createAppContainer(
  createSwitchNavigator(
    {
      splash: Splash,
      Auth: AuthStack,
      App: AppStack
    },
    {
      initialRouteName: "splash"
    }
  )
);
