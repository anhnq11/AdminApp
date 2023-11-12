import { Image, StyleSheet, Text, TouchableOpacity, View, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import URL from '../../../../UrlApi';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';

const EditUser = ({ route, navigation }) => {

    const { data } = route.params
    const { user } = route.params
    const [listRoles, setListRoles] = useState([])
    const [role, setRole] = useState(data.id_role)

    const getListRoles = () => {
        axios({
            method: 'get',
            url: `${URL}users/roles`,
        }).then((res) => {
            if (res.status === 200) {
                setListRoles(res.data)
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const updateUser = async () => {
        if ((data._id != user._id) && (user.id_role.level == 1)) {
            await axios({
                method: 'post',
                url: `${URL}users/updateRole`,
                data: {
                    _id: data._id,
                    id_role: role._id
                }
            })
                .then((res) => {
                    if (res.status == 200) {
                        ToastAndroid.show('Cập nhật tài khoản người dùng thành công!', ToastAndroid.SHORT)
                        navigation.navigate('MainScr', { screen: 'Home' });
                    }
                })
                .catch((err) => {
                    console.log(err);
                })

        }
        else {
            Alert.alert('Thông báo', 'Chỉ quản trị viên có quyền thực hiện thao tác!');
            navigation.navigate('MainScr', { screen: 'Home' });
        }
    }

    const deleteUser = () => {
        Alert.alert('Xác nhận', 'Bạn chắc chắn muốn xóa người dùng này?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    axios({
                        method: 'delete',
                        url: `${URL}users/user?_id=${data._id}`,
                    }).then((res) => {
                        if (res.status == 200) {
                            ToastAndroid.show('Xóa người dùng thành công!', ToastAndroid.SHORT)
                                navigation.navigate('MainScr', { screen: 'Home' });
                            };
                        }
                    ).catch((err) => {
                        console.log(err);
                    })
                }
            },
        ]);
    }

    React.useEffect(() => {
        getListRoles();
    }, [navigation]);

    return (
        <View style={styles.container}>
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
                }}>Chỉnh sửa thông tin</Text>
            </View>
            <Text style={styles.receive_add}>Chức vụ</Text>
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.receive_add_2}
                selectedTextStyle={styles.receive_add_2}
                inputSearchStyle={styles.receive_add_2}
                itemTextStyle={styles.item_text}
                iconColor='#EFE3C8'
                data={listRoles}
                maxHeight={300}
                labelField="name"
                valueField="_id"
                placeholder="Chọn chức vụ"
                value={role._id}
                onChange={item => {
                    setRole(item)
                }}
            />
            <View style={styles.bottomLayout}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    updateUser()
                }}>
                    <Text style={styles.text}>Cập nhật</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#201520' }]} onPress={() => {
                    deleteUser()
                }}>
                    <Text style={[styles.text, { color: '#EFE3C8' }]}>Xóa</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditUser

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 10,
        paddingTop: 15,
        backgroundColor: '#201520',
        alignItems: 'center',
    },
    receive_add: {
        width: '100%',
        fontSize: 25,
        color: '#EFE3C8',
        flexWrap: 'wrap',
        fontWeight: 'bold',
    },
    receive_add_2: {
        fontSize: 19,
        color: '#EFE3C8',
        flexWrap: 'wrap',
    },
    dropdown: {
        width: '90%',
        margin: 16,
        height: 50,
        borderColor: '#EFE3C8',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15
    },
    bottomLayout: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10
    },
    button: {
        width: '100%',
        backgroundColor: '#EFE3C8',
        marginBottom: 10,
        borderRadius: 20,
        paddingVertical: 2,
        borderColor: '#EFE3C8',
        borderWidth: 2,
    },
    text: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25,
        color: '#201520'
    },
    item_text: {
        fontSize: 19,
        color: '#201520',
    }
})