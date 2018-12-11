import { createStackNavigator, createAppContainer } from 'react-navigation';
import Feed from './src/components/Feed'
import Login from './src/screens/Login'

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: () => ({
      title: 'Login',
      
    }),
  }
});

export default createAppContainer(AppNavigator);