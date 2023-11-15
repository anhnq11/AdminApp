import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TextInput, ToastAndroid, Switch } from 'react-native'
import React from 'react'
import { useState } from 'react';
import URL from '../../../../UrlApi';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import RNFS from 'react-native-fs'
import { launchImageLibrary } from 'react-native-image-picker'

const EditProducts = ({ route, navigation }) => {

    const { data } = route.params

    const [listCats, setListCats] = useState([])
    const [image, setImage] = useState(data.image)
    const [name, setName] = useState(data.name)
    const [price, setPrice] = useState(data.price)
    const [desc, setDesc] = useState(data.desc)
    const [category, setCategory] = useState(data.id_cat)
    const [isEnabled, setIsEnabled] = useState(data.status);
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

    const pickImage = async () => {
        launchImageLibrary({ mediaType: 'photo' }, async (result) => {
            if (result.errorCode) {
                console.log('ImagePicker Error: ', result.errorCode);
            } else if (result.assets && result.assets.length > 0) {
                const source = result.assets[0].uri;
                let file_ext = source.substring(source.lastIndexOf('.') + 1);

                try {
                    const base64 = await RNFS.readFile(result.assets[0].uri, 'base64');
                    setImage('data:image/' + file_ext + ';base64,' + base64);
                } catch (error) {
                    console.error('Error reading file as base64: ', error);
                }
            } else {
                console.log('No assets selected');
            }
        });
    };

    const addProducts = async () => {
        setError(null)
        if (name == null || price == null || category == null || desc == null || image == null) {
            setError('Vui lòng điền đầy đủ thông tin!');
            return
        }

        const updateData = {
            _id: data._id,
            name: name,
            price: price,
            id_cat: category._id,
            desc: desc,
            image: image,
            status: isEnabled
        }

        await axios({
            method: 'put',
            url: `${URL}products/products`,
            data: JSON.stringify(updateData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                if (res.status == 200) {
                    ToastAndroid.show('Cập nhật sản phẩm thành công!', ToastAndroid.SHORT)
                    navigation.navigate('MainScr', { screen: 'Home' });
                    return;
                } else {
                    ToastAndroid.show('Có lỗi xảy ra. Vui lòng thử lại!', ToastAndroid.SHORT)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
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
                }}>Chi tiết sản phẩm</Text>
            </View>
            <View style={{ alignItems: 'center', marginBottom: 10 }}>
                <View>
                    <TouchableOpacity style={{
                        justifyContent: 'center',
                        borderRadius: 10,
                        overflow: 'hidden',
                    }}
                        onPress={() => { pickImage() }}
                    >
                        {
                            image
                                ? (<View>
                                    <Image style={{
                                        width: 100,
                                        height: 100,
                                        resizeMode: 'cover'
                                    }}
                                        source={{ uri: image }} />
                                </View>)
                                : (<View>
                                    <Text style={{
                                        width: 100,
                                        height: 100,
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        borderColor: '#EFE3C8',
                                        borderStyle: 'dashed',
                                        color: '#EFE3C8',
                                        fontSize: 20,
                                        textAlign: 'center',
                                        textAlignVertical: 'center'
                                    }}>Add a Image</Text>
                                </View>)
                        }
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
                defaultValue={name}
                onChangeText={(text) => { setName(text) }} />
            <TextInput
                keyboardType='number-pad'
                placeholder='Giá bán...'
                placeholderTextColor={'#EFE3C8'}
                style={styles.input}
                defaultValue={price.toString()}
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
                value={category._id}
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
                defaultValue={desc}
                style={[styles.input, { textAlignVertical: 'top' }]}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => { setDesc(text) }} />
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
            }}>
                <Text style={ styles.receive_add_2 }>Dừng bán sản phẩm:</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => {
                        setIsEnabled(!isEnabled)
                    }}
                    value={isEnabled}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => {
                addProducts()
                // console.log(category);
            }}>
                <Text style={styles.text}>Cập nhật</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EditProducts

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