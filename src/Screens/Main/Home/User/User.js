import { View, Text, Image, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../Redux/Reducer/Reducer';
import URL from '../../../../UrlApi';
import axios from 'axios';
let windowWidth = Dimensions.get('window').width;
import Style from './UserStyle';

const Users = ({ navigation }) => {
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
        getListUsers();
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
                            <View style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 10
                            }}>
                                <TouchableOpacity style={{ width: '10%' }} onPress={() => navigation.goBack()}>
                                    <Image style={{
                                        width: 30,
                                        height: 30,
                                        tintColor: '#EFE3C8'
                                    }} source={{ uri: 'https://i.pinimg.com/originals/c6/1b/7d/c61b7d1723f3ec00c51537d7525bc4dc.png' }} />
                                </TouchableOpacity>
                                <Text style={{
                                    width: '90%',
                                    color: '#EFE3C8',
                                    fontSize: 30,
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }}>Quản lý tài khoản</Text>
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
                                    source={{
                                        uri: item.image ?
                                            item.image :
                                            'https://th.bing.com/th/id/OIP.4NKHCiIt5eVTkmhWokCqJAHaHa?pid=ImgDet&w=640&h=640&rs=1'
                                    }} />
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
                    <TouchableOpacity style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        backgroundColor: '#EFE3C8',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: 5,
                        right: 5
                    }}
                        onPress={() => {
                            if (user.id_role.level == 1){
                                navigation.navigate('AddUser')
                            }
                            else{
                                Alert.alert('Thông báo', 'Bạn không có quyền thực hiện thao tác này!')
                            }
                        }}
                    >
                        <Image style={{
                            width: 35,
                            height: 35,
                            tintColor: '#201520'
                        }} source={{ uri: 'https://aux2.iconspalace.com/uploads/plus-icon-256.png' }} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Users

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