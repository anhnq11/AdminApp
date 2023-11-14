import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TextInput, ToastAndroid } from 'react-native'
import React from 'react'
import { useState } from 'react';
import URL from '../../../../UrlApi';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
const AddProducts = ({ navigation }) => {

    const [data, setData] = useState([])
    const [listCats, setListCats] = useState([])
    const [image, setImage] = useState(null)
    const [name, setName] = useState(null)
    const [price, setPrice] = useState(null)
    const [desc, setDesc] = useState(null)
    const [category, setCategory] = useState(null)
    const [error, setError] = useState(null)

    const getListCats = () => {
        axios({
            method: 'get',
            url: `${URL}products/categories`,
        }).then((res) => {
            if (res.status === 200) {
                setListCats(res.data)
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    React.useEffect(() => {
        getListCats();
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
                }}>Thêm sản phẩm mới</Text>
            </View>
            <View style={{ alignItems: 'center', marginBottom: 10 }}>
                <View>
                    <Image
                        source={{ uri: image ? image : 'https://th.bing.com/th/id/R.55393befef8a75d3a59d25ee7931d60f?rik=Dmwko1HbUCWZ7w&riu=http%3a%2f%2fgetdrawings.com%2ffree-icon%2fpowerpoint-user-icon-59.png&ehk=zkEtxliUAs%2fFgrsCJuqa4qWXNltwnt8b9%2fyMoGmWSYU%3d&risl=&pid=ImgRaw&r=0' }}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 100,
                            marginTop: 30
                        }}
                    />
                    <TouchableOpacity onPress={() => pickImage()}>
                        <Image
                            source={{ uri: "https://cdn1.iconfinder.com/data/icons/user-fill-icons-set/144/User003_Edit-512.png" }}
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: '#EFE3C8',
                                position: 'absolute',
                                bottom: -5,
                                right: 0,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
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
                placeholder='Tên sản phẩm...'
                placeholderTextColor={'#EFE3C8'}
                style={styles.input}
                onChangeText={(text) => { setName(text) }} />
            <TextInput
                keyboardType='number-pad'
                placeholder='Giá bán...'
                placeholderTextColor={'#EFE3C8'}
                style={styles.input}
                onChangeText={(text) => { setPrice(text) }} />
            <Dropdown
                style={styles.input}
                placeholderStyle={styles.receive_add_2}
                selectedTextStyle={styles.receive_add_2}
                inputSearchStyle={styles.receive_add_2}
                itemTextStyle={styles.item_text}
                iconColor='#EFE3C8'
                data={listCats}
                maxHeight={300}
                labelField="name"
                valueField="_id"
                placeholder="Chọn loại sản phẩm"
                onChange={item => {
                    setCategory(item)
                }}
            />
            <TextInput
                placeholder='Mô tả sản phẩm...'
                placeholderTextColor={'#EFE3C8'}
                style={[ styles.input, { textAlignVertical: 'top'}]}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => { setDesc(text) }} />

            <TouchableOpacity style={styles.button} onPress={() => { addUser() }}>
                <Text style={styles.text}>Thêm sản phẩm</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddProducts

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