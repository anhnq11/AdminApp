import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/Redux/Store/Store';
import * as React from 'react'
import Splash from './src/Screens/Splash/Splash';
import Route from './src/Screens/Route/Route';
import Login from './src/Screens/Login/Login';
import Regis from './src/Screens/Regis/Regis';
import BottomTabNav from './src/Screens/Main/BottomTabNav';
import EditUser from './src/Screens/Main/Home/EditUser';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="Route" component={Route} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Regis" component={Regis} options={{ headerShown: false }} />
          <Stack.Screen name="MainScr" component={BottomTabNav} options={{ headerShown: false }} />
          <Stack.Screen name="EditUser" component={EditUser} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
