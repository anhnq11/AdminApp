import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScr from './Home/Home';
// import ProductsScr from './Products/Products';
// import CartScr from './Cart/Cart';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from './Profile/Profile';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScr}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#201520',
          tabBarIcon: ({ focused }) => (
            <Image style={{ 
              width: 35, 
              height: 35, 
              resizeMode: 'contain', 
              tintColor: focused ? '#201520' : '#EFE3C8'
            }} source={{ uri: 'https://th.bing.com/th/id/R.a735b54c72c6babe5bab1564ab938c58?rik=mqZbKiCIE7gYqg&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_461203.png&ehk=tFlSasFqtZXR0VYLTfbVJ2RYRlCcD%2ftL%2bWMxmdFQNK4%3d&risl=&pid=ImgRaw&r=0' }} />
          ),
          tabBarActiveBackgroundColor: '#EFE3C8',
          tabBarInactiveBackgroundColor: '#201520'
        }}
      />
      {/* <Tab.Screen name="Products" component={ProductsScr}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => {
            let color;
            if (focused) {
              color = '#201520';
            }
            else{
              color = '#EFE3C8'
            }
            return (<FontAwesome name='th-list' style={{ fontSize: 30 }} color={color}/>)
          },
          tabBarActiveBackgroundColor: '#EFE3C8',
          tabBarInactiveBackgroundColor: '#201520'
        }}
      />
      <Tab.Screen name="Cart" component={CartScr}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#201520',
          tabBarIcon: ({focused}) => {
            let color;
            if (focused) {
              color = '#201520';
            }
            else{
              color = '#EFE3C8'
            }
            return (<FontAwesome name='shopping-cart' style={{ fontSize: 32 }} color={color}/>)
          },
          tabBarActiveBackgroundColor: '#EFE3C8',
          tabBarInactiveBackgroundColor: '#201520'
        }}
      /> */}
      <Tab.Screen name="Profile" component={Profile}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#201520',
          tabBarIcon: ({focused}) => {
            let color;
            if (focused) {
              color = '#201520';
            }
            else{
              color = '#EFE3C8'
            }
            return (<MaterialCommunityIcons name="account" color={color} size={30} />)
          },
          tabBarActiveBackgroundColor: '#EFE3C8',
          tabBarInactiveBackgroundColor: '#201520'
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNav