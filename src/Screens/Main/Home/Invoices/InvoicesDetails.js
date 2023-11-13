import { Alert, FlatList, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import URL from '../../../../UrlApi';

const InvoicesDetails = ({ route, navigation }) => {

    const { data } = route.params;
    const [listStatus, setListStatus] = useState([])
    const [status, setStatus] = useState(data.status)
    const [newStatus, setNewStatus] = useState(null)

    const getListStatus = () => {
        axios({
            method: 'get',
            url: `${URL}products/status`,
        }).then((res) => {
            if (res.status === 200) {
                setListStatus(res.data)
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const updateFunction = async (status) => {
        await axios({
            method: 'post',
            url: `${URL}products/invoicesStatus`,
            data: {
                _id: data._id,
                status: status
            }
        })
            .then((res) => {
                if (res.status == 200) {
                    ToastAndroid.show('Cập nhật trạng thái đơn hàng thành công!', ToastAndroid.SHORT)
                    navigation.navigate('MainScr', { screen: 'Home' });
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const update = () => {
        if (newStatus.status <= status.status) {
            Alert.alert('Thông báo', 'Không thể thực hiện thao tác này!')
        }
        else {
            Alert.alert('Thông báo', 'Bạn chắc chắn muốn cập nhật cho đơn hàng này?', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        updateFunction(newStatus._id)
                    }
                }
            ])
        }
    }

    const cancel = () => {
        Alert.alert('Thông báo', 'Bạn chắc chắn muốn huỷ đơn hàng này?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => {
                    updateFunction(listStatus[listStatus.length - 1]._id)
                }
            }
        ])
    }

    React.useEffect(() => {
        getListStatus();
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
                }}>Chi tiết đơn hàng</Text>
            </View>
            <FlatList
                data={data.listCart}
                keyExtractor={(item) => item._id}
                key={(item) => item._id}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        <Text style={{
                            color: '#EFE3C8',
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginBottom: 5
                        }}>
                            Thông tin đơn hàng
                        </Text>
                        <Text style={styles.receive_add}>Khách hàng: {data.username} - {data.phonenum}</Text>
                        <Text style={styles.receive_add}>Địa chỉ: {data.userAddress.address_details}, {data.userAddress.address}</Text>
                        <Text style={styles.receive_add}>Trạng thái đơn hàng:
                            <Text style={{
                                color: 'green',
                                fontSize: 19,
                            }}> {data.status.name}</Text></Text>
                        <Text style={{
                            color: '#EFE3C8',
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginVertical: 5
                        }}>
                            Chi tiết đơn hàng
                        </Text>
                    </View>
                }
                ListFooterComponent={
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            borderBottomWidth: 3,
                            borderColor: '#EFE3C8',
                            borderStyle: 'dotted',
                            paddingBottom: 10
                        }}>
                            <Text style={{
                                color: '#EFE3C8',
                                fontSize: 21,
                            }}>Tổng tiền </Text>
                            <Text style={{
                                color: '#EFE3C8',
                                fontSize: 21,
                                fontWeight: 'bold'
                            }}>{(data.totalAmount).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VNĐ</Text>
                        </View>
                        {
                            data.status.status != 4 ? (
                                <View>
                                    <Text style={{
                                        color: '#EFE3C8',
                                        fontSize: 21,
                                        fontWeight: 'bold',
                                        marginTop: 10
                                    }}>
                                        Cập nhật trạng thái
                                    </Text>
                                    <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={styles.receive_add_2}
                                        selectedTextStyle={styles.receive_add_2}
                                        inputSearchStyle={styles.receive_add_2}
                                        itemTextStyle={styles.item_text}
                                        iconColor='#EFE3C8'
                                        data={listStatus}
                                        maxHeight={300}
                                        labelField="name"
                                        valueField="_id"
                                        placeholder="Chọn trạng thái"
                                        value={status._id}
                                        onChange={item => {
                                            setNewStatus(item)
                                        }}
                                    />
                                    <View style={styles.bottomLayout}>
                                        <TouchableOpacity style={styles.button} onPress={() => {
                                            update()
                                        }}>
                                            <Text style={styles.text}>Cập nhật</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.button, { backgroundColor: '#201520' }]} onPress={() => {
                                            cancel()
                                        }}>
                                            <Text style={[styles.text, { color: '#EFE3C8' }]}>Huỷ đơn hàng</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                <View></View>
                            )
                        }
                    </View>
                }
                renderItem={({ item }) =>
                    <View item={item} style={{
                        backgroundColor: '#362C36',
                        flexDirection: 'row',
                        padding: 10,
                        borderRadius: 10,
                        marginBottom: 10
                    }}>
                        <View style={{
                            width: 65,
                            height: 65,
                            borderRadius: 10,
                            overflow: 'hidden',
                            marginRight: 10
                        }}>
                            <Image
                                source={{ uri: item.product_id.image }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    resizeMode: 'cover',
                                }}
                            />
                        </View>
                        <View style={{ width: '75%' }}>
                            <Text style={{
                                color: '#EFE3C8',
                                fontSize: 18,
                            }}>
                                {item.product_id.name}
                            </Text>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <Text style={{
                                    color: '#EFE3C8',
                                    fontSize: 15,
                                }}>
                                    Phân loại: Màu: {item.color} - Size: {item.size}
                                </Text>
                                <Text style={{
                                    position: 'absolute',
                                    color: '#EFE3C8',
                                    fontSize: 15,
                                    right: 0
                                }}>
                                    x{item.quantity}
                                </Text>
                            </View>
                            <Text style={{
                                color: '#EFE3C8',
                                fontSize: 16,
                            }}>
                                {(item.price).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VNĐ
                            </Text>
                        </View>
                    </View>
                }
            />
        </View>
    )
}

export default InvoicesDetails

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
    receive_add_2: {
        fontSize: 19,
        color: '#EFE3C8',
        flexWrap: 'wrap',
    },
    dropdown: {
        width: '100%',
        marginVertical: 10,
        height: 50,
        borderColor: '#EFE3C8',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15
    },
    bottomLayout: {
        width: '100%',
        alignItems: 'center',
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