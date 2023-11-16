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
import EditUser from './src/Screens/Main/Home/User/EditUser';
import Users from './src/Screens/Main/Home/User/User';
import Invoices from './src/Screens/Main/Home/Invoices/Invoices';
import InvoicesDetails from './src/Screens/Main/Home/Invoices/InvoicesDetails';
import Cats from './src/Screens/Main/Home/Cats/Cats';
import AddUser from './src/Screens/Main/Home/User/AddUser';
import Products from './src/Screens/Main/Home/Products/Products';
import AddProducts from './src/Screens/Main/Home/Products/AddProducts';
import EditProducts from './src/Screens/Main/Home/Products/EditProducts';
import Statistics from './src/Screens/Main/Home/Statistics/Statistics';

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
          <Stack.Screen name="Users" component={Users} options={{ headerShown: false }} />
          <Stack.Screen name="EditUser" component={EditUser} options={{ headerShown: false }} />
          <Stack.Screen name="AddUser" component={AddUser} options={{ headerShown: false }} />
          <Stack.Screen name="Invoices" component={Invoices} options={{ headerShown: false }} />
          <Stack.Screen name="InvoicesDetails" component={InvoicesDetails} options={{ headerShown: false }} />
          <Stack.Screen name="Cats" component={Cats} options={{ headerShown: false }} />
          <Stack.Screen name="Products" component={Products} options={{ headerShown: false }} />
          <Stack.Screen name="AddProducts" component={AddProducts} options={{ headerShown: false }} />
          <Stack.Screen name="EditProducts" component={EditProducts} options={{ headerShown: false }} />
          <Stack.Screen name="Statistics" component={Statistics} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
