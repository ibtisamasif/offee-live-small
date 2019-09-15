import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import Login from "../Containers/LoginFlow/login";
// import SignUp from '../Containers/LoginFlow/signup';
import MainTab from "../Containers/ApplicationTabs/MainTab";
import Splash from "../Containers/splash";
import TestInstructions from "../Containers/MainFlow/Tests/testInstructions";
import MCQ from "../Containers/MainFlow/Tests/mcqScreen";
import TestResult from "../Containers/MainFlow/Tests/testResult";
import Notification from "../Containers/MainFlow/Home/notification";
import PracticeMCQ from "../Containers/MainFlow/Practice/PracticeMcqScreen";
import AppDrawer from "../Containers/AppDrawer/AppDrawer";
const AuthStack = createStackNavigator({
  login: {
    screen: Login
  }
  // ,
  // signup: {
  //     screen: SignUp
  // },
});

const AppStack = createStackNavigator({
  drawer: {
    screen: AppDrawer,
    navigationOptions: {
      header: null
    }
  },
  // MainTab: {
  //     screen: MainTab,
  //     navigationOptions: {
  //         header: null
  //     }
  // },
  testInstructions: {
    screen: TestInstructions,
    navigationOptions: {
      title: "Instructions"
    }
  },
  mcqScreen: {
    screen: MCQ,
    navigationOptions: {
      header: null
    }
  },
  testResult: {
    screen: TestResult
  },
  notification: {
    screen: Notification
  },
  practiceMcq: {
    screen: PracticeMCQ,
    navigationOptions: {
      header: null
    }
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
