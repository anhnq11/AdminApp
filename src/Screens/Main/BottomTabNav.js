import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScr from './Home/Home';
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
            }} source={{ uri: 'https://th.bing.com/th/id/R.15818a8eaa3fb532a51da05588114677?rik=d3cIDOuJl6LRbg&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_8.png&ehk=VHJrfTzw0DzmTG9MKt2vHPmMmPskfAMVfBEJvDcJiH4%3d&risl=&pid=ImgRaw&r=0' }} />
          ),
          tabBarActiveBackgroundColor: '#EFE3C8',
          tabBarInactiveBackgroundColor: '#201520'
        }}
      />
      <Tab.Screen name="Profile" component={Profile}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#201520',
          tabBarIcon: ({ focused }) => (
            <Image style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
              tintColor: focused ? '#201520' : '#EFE3C8'
            }} source={{ uri: 'https://th.bing.com/th/id/R.bae2d37c4317140a408aef6671346186?rik=X1vYbxH6nQxCcA&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_218090.png&ehk=poXsiWmpbb3%2b%2bK%2blj8H9AQprCYsoz4kt%2bU4rFFKbOCo%3d&risl=&pid=ImgRaw&r=0' }} />
          ),
          tabBarActiveBackgroundColor: '#EFE3C8',
          tabBarInactiveBackgroundColor: '#201520'
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNav