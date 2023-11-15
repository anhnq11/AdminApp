import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TextInput, ToastAndroid } from 'react-native'
import React from 'react'
import { useState } from 'react';
import URL from '../../../../UrlApi';
import axios from 'axios';
import ContentLoader from 'react-native-easy-content-loader';
import { SwipeListView } from 'react-native-swipe-list-view';
const Products = ({ navigation }) => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getData = () => {
        setIsLoading(true)
        axios({
            method: 'get',
            url: `${URL}products/products`,
        }).then((res) => {
            if (res.status === 200) {
                setData(res.data)
                setIsLoading(false)
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
                }}>Quản lý Sản phẩm</Text>
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
                            height: '88%',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            // alignItems: 'center',
                        }}>
                            <TouchableOpacity style={{
                                backgroundColor: '#C94C4C',
                                width: 65,
                                height: '100%',
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                                onPress={() => {
                                    navigation.navigate('EditProducts', { data: item })
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
                            marginBottom: 10,
                            // justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                width: 60,
                                height: 60,
                                borderRadius: 10,
                                overflow: 'hidden',
                                backgroundColor: 'white',
                                marginRight: 10
                            }}>
                                <Image style={{ width: '100%', height: '100%', resizeMode: 'center' }} source={{ uri: item.image }} />
                            </View>
                            <View>
                                <Text style={{
                                    height: 26,
                                    color: '#EFE3C8',
                                    fontSize: 20,
                                    fontWeight: 'bold'
                                }}>
                                    {item.name}
                                </Text>
                                <Text style={{
                                    height: 26,
                                    color: 'green',
                                    fontSize: 20,
                                    fontWeight: 'bold'
                                }}>
                                    <Text style={{ color: '#EFE3C8' }}>Giá bán: </Text>
                                    {item.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VNĐ
                                </Text>
                            </View>
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
                    navigation.navigate('AddProducts')
                }}
            >
                <Image style={{
                    width: 35,
                    height: 35,
                    tintColor: '#201520'
                }} source={{ uri: 'https://aux2.iconspalace.com/uploads/plus-icon-256.png' }} />
            </TouchableOpacity>
        </View>
    )
}

export default Products

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