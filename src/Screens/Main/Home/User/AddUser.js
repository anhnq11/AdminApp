import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ToastAndroid } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../../../Redux/Reducer/Reducer'
import { Dropdown } from 'react-native-element-dropdown'
import URL from '../../../../UrlApi'
import axios from 'axios'

const AddUser = ({ navigation }) => {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const [image, setImage] = useState(null)
    const [fullname, setFullname] = useState(null)
    const [phonenum, setPhonenum] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [role, setRole] = useState(null)
    const [error, setError] = useState(null)
    const [listRoles, setListRoles] = useState([])

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
                }}>Thêm mới tài khoản</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={{ uri: 'https://th.bing.com/th/id/R.55393befef8a75d3a59d25ee7931d60f?rik=Dmwko1HbUCWZ7w&riu=http%3a%2f%2fgetdrawings.com%2ffree-icon%2fpowerpoint-user-icon-59.png&ehk=zkEtxliUAs%2fFgrsCJuqa4qWXNltwnt8b9%2fyMoGmWSYU%3d&risl=&pid=ImgRaw&r=0' }}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 100,
                        marginTop: 30
                    }}
                />
                <TouchableOpacity onPress={() => chooseImage()}>
                    <Image
                        source={{ uri: "https://cdn1.iconfinder.com/data/icons/user-fill-icons-set/144/User003_Edit-512.png" }}
                        style={{
                            width: 35,
                            height: 35,
                            tintColor: '#EFE3C8',
                            position: 'absolute',
                            bottom: -5,
                            right: -5,
                        }}
                    />
                </TouchableOpacity>
            </View>
            <Text style={{
                width: '100%',
                color: '#EFE3C8',
                fontSize: 22,
                marginTop: 10,
                fontWeight: 'bold'
            }}>
                Thông tin cá nhân
            </Text>
            {
                error ? (
                    <Text style={{
                        width: '100%',
                        color: 'red',
                        fontSize: 17,
                        marginTop: 10,
                        fontStyle: 'italic'
                    }}>
                        *{error}
                    </Text>
                ) : (<View></View>)
            }
            <TextInput
                type="text"
                placeholder='Họ và tên...'
                placeholderTextColor={'#EFE3C8'}
                style={styles.input}
                onChangeText={(text) => { setFullname(text) }} />
            <TextInput
                type="text"
                placeholder='Số điện thoại...'
                placeholderTextColor={'#EFE3C8'}
                style={styles.input}
                onChangeText={(text) => { setPhonenum(text) }} />
            <TextInput
                type="text"
                placeholder='Email...'
                placeholderTextColor={'#EFE3C8'}
                style={styles.input}
                onChangeText={(text) => { setEmail(text) }} />
            <TextInput
                type="text"
                placeholder='Mật khẩu...'
                secureTextEntry={true}
                placeholderTextColor={'#EFE3C8'}
                style={styles.input}
                onChangeText={(text) => { setPassword(text) }} />
            <Dropdown
                style={styles.input}
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
                onChange={item => {
                    setRole(item)
                }}
            />
            <TouchableOpacity style={styles.button} onPress={() => { handleUpdate() }}>
                <Text style={styles.text}>Thêm</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddUser

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 10,
        backgroundColor: '#201520',
    },
    receive_add: {
        fontSize: 17,
        color: '#EFE3C8',
        flexWrap: 'wrap',
    },
    input: {
        width: '100%',
        borderRadius: 20,
        borderColor: '#EFE3C8',
        color: '#EFE3C8',
        borderWidth: 2,
        marginTop: 10,
        fontSize: 20,
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    button: {
        width: '100%',
        backgroundColor: '#EFE3C8',
        marginTop: 10,
        borderRadius: 20,
        paddingVertical: 1,
        borderColor: '#EFE3C8',
        borderWidth: 2,
    },
    text: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25,
        color: '#201520'
    },
    receive_add_2: {
        fontSize: 19,
        color: '#EFE3C8',
        flexWrap: 'wrap',
    },
    item_text: {
        fontSize: 19,
        color: '#201520',
    }
})