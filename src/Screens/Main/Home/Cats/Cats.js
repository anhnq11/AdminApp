import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TextInput, ToastAndroid } from 'react-native'
import React from 'react'
import { useState } from 'react';
import URL from '../../../../UrlApi';
import axios from 'axios';
import ContentLoader from 'react-native-easy-content-loader';
import { SwipeListView } from 'react-native-swipe-list-view';

const Cats = ({ navigation }) => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [catName, setCatName] = useState(null)
    const [error, setError] = useState(null)
    const [catModel, setCatModel] = useState({})

    const getData = () => {
        setIsLoading(true)
        axios({
            method: 'get',
            url: `${URL}products/categories`,
        }).then((res) => {
            if (res.status === 200) {
                setData(res.data)
                setIsLoading(false)
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const addCat = async () => {
        setError(null)
        if (!catName) {
            setError('* Vui lòng nhập tên loại!')
            return
        }
        setVisible(false)
        await axios({
            method: 'post',
            url: `${URL}products/categories`,
            data: {
                name: catName
            }
        }).then((res) => {
            if (res.status === 200) {
                getData()
                setCatName(null)
                ToastAndroid.show('Thêm loại sản phẩm mới thành công!', ToastAndroid.SHORT)
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const updateCat = async () => {
        setError(null)
        if (!catName) {
            setError('* Vui lòng nhập tên loại!')
            return
        }
        setVisible2(false)
        await axios({
            method: 'put',
            url: `${URL}products/categories`,
            data: {
                _id: catModel._id,
                name: catName
            }
        }).then((res) => {
            if (res.status === 200) {
                getData()
                setCatName(null)
                ToastAndroid.show('Cập nhật loại sản phẩm thành công!', ToastAndroid.SHORT)
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    React.useEffect(() => {
        getData();
    }, [data.length]);

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
                }}>Thể loại sản phẩm</Text>
            </View>
            <ContentLoader active loading={isLoading} pWidth={'100%'} listSize={6}>
                <SwipeListView
                    data={data}
                    keyExtractor={(item) => item._id}
                    key={(item) => item._id}
                    horizontal={false}
                    rightOpenValue={-75}
                    // stopRightSwipe={-200}
                    renderHiddenItem={({ item }) => (
                        <View style={{
                            width: '100%',
                            height: '80%',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity style={{
                                backgroundColor: '#C94C4C',
                                width: 65,
                                height: '100%',
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                                onPress={() => {
                                    setCatModel(item)
                                    setVisible2(true)
                                }}
                            >
                                <Image style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: '#EFE3C8',
                                    resizeMode: 'contain'
                                }} source={{ uri: 'https://th.bing.com/th/id/R.6a49d5270c3642791fff4f173de90768?rik=bniCnxxM3HYqhA&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_376742.png&ehk=gLXmTnggDIPl%2byKSNfvvkVJ317bGuei4BvL4CmwKMjw%3d&risl=&pid=ImgRaw&r=0' }} />
                            </TouchableOpacity>
                        </View>
                    )}
                    renderItem={({ item }) =>
                        <View item={item} style={{
                            backgroundColor: '#362C36',
                            flexDirection: 'row',
                            padding: 10,
                            borderRadius: 10,
                            marginBottom: 10
                        }}>
                            <Text style={{
                                height: 26,
                                color: '#EFE3C8',
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}>
                                {item.name}
                            </Text>
                        </View>
                    }
                />
            </ContentLoader>
            <TouchableOpacity style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                backgroundColor: '#EFE3C8',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: 15,
                right: 15
            }}
                onPress={() => {
                    setVisible(true)
                }}
            >
                <Image style={{
                    width: 35,
                    height: 35,
                    tintColor: '#201520'
                }} source={{ uri: 'https://aux2.iconspalace.com/uploads/plus-icon-256.png' }} />
            </TouchableOpacity>
            <Modal
                visible={visible}
                animationType='slide'
                transparent={true}
            >
                <View style={{
                    backgroundColor: '#201520',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '50%',
                    marginHorizontal: 30,
                    borderWidth: 1,
                    borderColor: '#EFE3C8',
                    padding: 5,
                }}>
                    <Text style={{
                        color: '#EFE3C8',
                        fontSize: 21,
                        fontWeight: 'bold',
                    }}>Thêm loại sản phẩm</Text>
                    <TextInput
                        placeholder='Tên loại...'
                        placeholderTextColor={'#EFE3C8'}
                        style={styles.input}
                        onChangeText={(text) => {
                            setCatName(text)
                            setError(null)
                        }} />
                    {
                        error ? (<Text style={{
                            fontSize: 17,
                            color: 'red',
                            fontStyle: 'italic',
                            marginBottom: 10
                        }}>{error}</Text>) : (<View></View>)
                    }
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity style={styles.button} onPress={() => setVisible(false)}>
                            <Text style={styles.text}>
                                Close
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => addCat()}>
                            <Text style={styles.text}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={visible2}
                animationType='slide'
                transparent={true}
            >
                <View style={{
                    backgroundColor: '#201520',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '50%',
                    marginHorizontal: 30,
                    borderWidth: 1,
                    borderColor: '#EFE3C8',
                    padding: 5,
                }}>
                    <Text style={{
                        color: '#EFE3C8',
                        fontSize: 21,
                        fontWeight: 'bold',
                    }}>Sửa loại sản phẩm</Text>
                    <TextInput
                        placeholder='Tên loại...'
                        defaultValue={catModel.name}
                        placeholderTextColor={'#EFE3C8'}
                        style={styles.input}
                        onChangeText={(text) => {
                            setCatName(text)
                            setError(null)
                        }} />
                    {
                        error ? (<Text style={{
                            fontSize: 17,
                            color: 'red',
                            fontStyle: 'italic',
                            marginBottom: 10
                        }}>{error}</Text>) : (<View></View>)
                    }
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity style={styles.button} onPress={() => setVisible2(false)}>
                            <Text style={styles.text}>
                                Close
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => updateCat()}>
                            <Text style={styles.text}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Cats

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 10,
        backgroundColor: '#201520'
    },
    receive_add: {
        fontSize: 17,
        color: '#EFE3C8',
        flexWrap: 'wrap',
    },
    input: {
        width: '100%',
        borderRadius: 10,
        borderColor: '#EFE3C8',
        color: '#EFE3C8',
        borderWidth: 2,
        marginVertical: 10,
        fontSize: 20,
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    button: {
        width: '45%',
        backgroundColor: '#EFE3C8',
        borderRadius: 10,
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#201520',
        paddingVertical: 3,
    }
})