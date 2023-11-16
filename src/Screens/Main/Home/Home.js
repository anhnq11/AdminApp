import { View, Text, Image, ScrollView, FlatList, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../Redux/Reducer/Reducer';

import Style from './User/UserStyle'
import logoImg from '../../../../assets/png/image2.png';
let windowWidth = Dimensions.get('window').width;

const Home = ({ navigation }) => {
  const user = useSelector(selectUser);

  const data = [
    {
      name: 'Tài khoản',
      image: 'https://th.bing.com/th/id/R.128c99ebdee725b9e1c3c0390d98cd47?rik=9reRVopQkBduLg&riu=http%3a%2f%2fsimpleicon.com%2fdev%2fwp-content%2fuploads%2fmulty-user-256x256.png&ehk=Gw8vowbXpNWwiV2Vshi19CY72aO0rhLhkBfOPzqHpHc%3d&risl=&pid=ImgRaw&r=0',
      navName: 'Users'
    },
    {
      name: 'Đơn hàng',
      image: 'https://cdn3.iconfinder.com/data/icons/rounded-monosign/142/invoice-1024.png',
      navName: 'Invoices',
    },
    {
      name: 'Sản phẩm',
      image: 'https://th.bing.com/th/id/R.9747b37944b9692866892f0ce4788e09?rik=F%2fdIcjKlwvXy0Q&pid=ImgRaw&r=0',
      navName: 'Products'
    },
    {
      name: 'Thể loại',
      image: 'https://static.thenounproject.com/png/524455-200.png',
      navName: 'Cats'
    },
    {
      name: 'Thống kê',
      image: 'https://th.bing.com/th/id/R.62ceb3d1f64f7b5f2f96307caed868eb?rik=Z7kFZQz97RG34w&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_530012.png&ehk=LsJqTrpLyDRYhphTAHQ5T2%2fMxKl1RnPP2tu%2bob%2fERrc%3d&risl=&pid=ImgRaw&r=0',
      navName: 'Statistics'
    }
  ]

  return (
    <SafeAreaView>
      <View style={[Style.container, { width: windowWidth, height: '100%' }]} >
        <View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.navName}
            key={(item => item.navName)}
            numColumns={2}
            horizontal={false}
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
                      user.image ? (
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
              <TouchableOpacity style={{
                width: '47%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#EFE3C8',
                marginRight: 15,
                marginBottom: 15,
                borderRadius: 15,
                padding: 10
              }}
              onPress={() => { navigation.navigate(item.navName)}}
              >
                <Image style={{
                  width: 70,
                  height: 70,
                  resizeMode: 'contain',
                  tintColor: '#201520'
                }}
                  source={{
                    uri: item.image
                  }} />
                <Text style={{
                  color: '#201520',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>{item.name}</Text>
              </TouchableOpacity>
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