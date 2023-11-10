import { View, Text, Image, ScrollView, FlatList, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../Redux/Reducer/Reducer';

import Style from './HomeStyle'
import logoImg from '../../../../assets/png/image2.png';
import URL from '../../../UrlApi';
import axios from 'axios';
let windowWidth = Dimensions.get('window').width;

const Home = ({ navigation }) => {
  const user = useSelector(selectUser);

  const [listUsers, setListUsers] = useState([])

  const getListUsers = () => {
    axios({
      method: 'get',
      url: `${URL}users/users`,
    }).then((res) => {
      if (res.status === 200) {
        setListUsers(res.data)
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  React.useEffect(() => {
    const tabPress = navigation.addListener('tabPress', (e) => {
      getListUsers();
    });

    getListUsers();

    return tabPress;
  }, [navigation]);

  return (
    <SafeAreaView>
      <View style={[Style.container, { width: windowWidth, height: '100%' }]} >
        <View>
          <FlatList
            data={listUsers}
            keyExtractor={(item) => item._id}
            key={(item => item._id)}
            ListHeaderComponent={
              <View style={Style.topLayout} >
                {/* Left layout */}
                <View style={Style.leftLayout} >
                  <View>
                    <Image style={{ width: 220, resizeMode: 'contain' }} source={logoImg} />
                  </View>
                  <Text style={[Style.text, { width: windowWidth }]} >Hi {user.id_role.name}, <Text style={[Style.text, { fontWeight: 'bold' }]} >{user.fullname}</Text> </Text>
                </View>
                {/* Right layout */}
                <View style={Style.rightLayout} >
                  <View style={Style.imgAvatar} >
                    {
                      user.imagae ? (
                        <Image style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={{ uri: user.image }} />
                      ) : (
                        <Image style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={{ uri: 'https://th.bing.com/th/id/OIP.4NKHCiIt5eVTkmhWokCqJAHaHa?pid=ImgDet&w=640&h=640&rs=1' }} />
                      )
                    }
                  </View>
                </View>
              </View>
            }
            renderItem={({ item }) =>
            <View style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderStyle: 'dotted',
              borderColor: '#EFE3C8',
              justifyContent: 'center',
            }}>
              <Image style={{
                width: 70, 
                height: 70, 
                borderRadius: 10,
                resizeMode: 'contain',
                 marginRight: 15
              }} 
              source={{ uri: item.image ? 
              item.image : 
              'https://th.bing.com/th/id/OIP.4NKHCiIt5eVTkmhWokCqJAHaHa?pid=ImgDet&w=640&h=640&rs=1'}}/>
              <View style={{
                width: '75%',
                marginBottom: 10,
                paddingBottom: 5
              }}>
                <Text style={{
                  color: '#EFE3C8',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>{item.fullname}</Text>
                <Text style={styles.receive_add}>{item.email ? (item.email + ' - ') : (null)}{item.phonenum}</Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <Text style={{
                    color: 'green',
                    fontSize: 17,
                  }}>{item.id_role.name}</Text>
                  <TouchableOpacity onPress={() =>
                    navigation.navigate('EditUser', { data: item, user: user })
                  }>
                    <Text style={{ color: '#EFE3C8', fontSize: 16, fontStyle: 'italic' }}>Chi tiết {'>'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 10,
    paddingTop: 15,
    backgroundColor: '#201520'
  },
  receive_add: {
    fontSize: 17,
    color: '#EFE3C8',
    flexWrap: 'wrap',
  }
})