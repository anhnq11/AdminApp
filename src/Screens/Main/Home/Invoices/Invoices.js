import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../Redux/Reducer/Reducer';
import URL from '../../../../UrlApi';
import axios from 'axios';

const Invoices = ({ navigation }) => {

    const [data, setData] = useState([])

    const getData = () => {
        axios({
            method: 'get',
            url: `${URL}products/invoices`,
        }).then((res) => {
            if (res.status === 200) {
                setData(res.data)
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const updateInvoice = ({ item }) => {
        let price = (item.totalAmount).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        Alert.alert('Xác nhận', 'Bạn đã nhận được hàng và thanh toán ' + price + ' VNĐ cho người bán!', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    axios({
                        method: 'put',
                        url: `${URL}products/invoices?_id=` + item._id,
                    }).then((res) => {
                        if (res.status === 200) {
                            getData()
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            },
        ]);
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
                }}>Quản lý đơn hàng</Text>
            </View>
            {
                data.length == 0 ? (
                    <Text style={[styles.receive_add, { textAlign: 'center', marginTop: '50%'}]}>Không có đơn hàng</Text>
                ) : (
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item._id}
                        key={(item => item._id)}
                        renderItem={({ item }) =>
                            <View style={{
                                borderBottomWidth: 1,
                                borderColor: '#EFE3C8',
                                borderStyle: 'dotted',
                                marginBottom: 10,
                                paddingBottom: 5
                            }}>
                                <Text style={{
                                    color: '#EFE3C8',
                                    fontSize: 18,
                                    fontWeight: 'bold',

                                }}>{item.createdAt}</Text>
                                <Text style={styles.receive_add}>{item.username} - {item.phonenum} - {item.userAddress.address_details}, {item.userAddress.address}</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <Text style={{
                                        color: 'green',
                                        fontSize: 17,
                                    }}>{item.status.name}</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('InvoicesDetails', { data: item })}>
                                        <Text style={{ color: '#EFE3C8', fontSize: 16, fontStyle: 'italic' }}>Chi tiết {'>'}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: 5
                                }}>
                                    <Text style={{
                                        color: '#EFE3C8',
                                        fontSize: 20,
                                        fontWeight: 'bold'
                                    }}>{(item.totalAmount).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VNĐ</Text>
                                    <TouchableOpacity style={{
                                        backgroundColor: '#EFE3C8',
                                        borderRadius: 10,
                                    }}
                                        onPress={() => {

                                        }}
                                    >
                                        <Text style={{
                                            color: '#201520',
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                            paddingHorizontal: 15,
                                            paddingVertical: 5
                                        }}>Huỷ đơn hàng</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    />
                )
            }
        </View>
    )
}

export default Invoices

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
    }
})