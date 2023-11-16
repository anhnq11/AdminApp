import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import axios from 'axios'
import URL from '../../../../UrlApi'
import { useState } from 'react';
import ContentLoader from 'react-native-easy-content-loader';
import { PieChart } from 'react-native-chart-kit';
const Statistics = ({ navigation }) => {

  const [totalRevenue, setTotalRevenue] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [thisMonth, setThisMonth] = useState(0)
  const [totalRevenueOfMonth, setTotalRevenueOfMonth] = useState(0)
  const [data, setData] = useState([])

  const getTotalRevenue = async () => {
    setIsLoading(true)
    axios({
      method: 'get',
      url: `${URL}products/getTotalRevenue`,
    }).then((res) => {
      if (res.status === 200) {
        setTotalRevenue(res.data.totalRevenue)
        setThisMonth(res.data.thisMonth)
        setTotalRevenueOfMonth(res.data.totalRevenueOfMonth)
        setData([
          {
            name: 'Tháng ' + res.data.thisMonth,
            revenue: res.data.totalRevenueOfMonth,
            color: '#C94C4C',
            legendFontColor: '#EFE3C8',
            legendFontSize: 20
          },
          {
            name: 'Khác',
            revenue: res.data.totalRevenue - res.data.totalRevenueOfMonth,
            color: '#EFE3C8',
            legendFontColor: '#EFE3C8',
            legendFontSize: 20
          }
        ])
        setIsLoading(false)
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  React.useEffect(() => {
    getTotalRevenue();
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
        }}>Thống kê</Text>
      </View>
      <ContentLoader active loading={isLoading} pWidth={'100%'} listSize={6}>
        <Text style={{
          color: '#EFE3C8',
          fontSize: 22,
          fontWeight: 'bold',
        }}>Tổng doanh thu</Text>
        <Text style={{
          color: '#EFE3C8',
          fontSize: 50,
          fontWeight: 'bold',
          textAlign: 'right'
        }}>{(totalRevenue).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} <Text style={{ fontSize: 20 }}>VNĐ</Text></Text>
        <Text style={{
          color: '#EFE3C8',
          fontSize: 22,
          fontWeight: 'bold',
        }}>Doanh thu tháng {thisMonth}</Text>
        <View style={{
          width: '100%',
          marginVertical: 10,
          justifyContent: 'center'
        }}>
          <PieChart
            data={data}
            width={Dimensions.get('window').width}
            height={200}
            chartConfig={{
              color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`
            }}
            accessor="revenue"
            backgroundColor="transparent"
            center={[0, 0]}
            hasLegend={false}
            paddingLeft='15'
            absolute
          />
          <View style={{
            position: 'absolute',
            right: 10,
          }}>
            {data.map(({ name, color }) => {
              return <View key={name} style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <View style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: color,
                  marginRight: 10
                }}></View>
                <Text style={{
                  color: '#EFE3C8',
                  fontSize: 20
                }}>{name}</Text></View>;
            })}
          </View>
        </View>
        <Text style={{
          color: '#EFE3C8',
          fontSize: 50,
          fontWeight: 'bold',
          textAlign: 'right'
        }}>
          {(totalRevenueOfMonth).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
          <Text style={{ fontSize: 20 }}>VNĐ</Text>
        </Text>
      </ContentLoader>
    </View>
  )
}

export default Statistics

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
})