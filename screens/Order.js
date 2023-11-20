import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

const OrderList = () => {
    const [orderListData, setOrderList] = useState([]);
    useEffect(() => {
        fetch('https://653f261d9e8bd3be29e000fc.mockapi.io/data')
        .then(response => response.json())
        .then(data => setNoti(data))
        .catch(error => console.error(error));
  }, []);
    const renderOrdersItem = ({ item }) => (
        <View style={{ width: '100%', padding: 5, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.15, shadowRadius: 2.0, borderBottomColor: '#DDD', borderBottomWidth: 1,}}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', padding: 5 }}>{item.title}</Text>
          <Text style={{ fontSize: 12, flexWrap: 'wrap', padding: 5 }}>{item.content}</Text>
          <Text style={{ fontSize: 10, padding: 5, color: 'gray' }}>{item.date}</Text>
        </View>
        );

    return (
        <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
        <FlatList
              data={notiData}
              renderItem={renderNotificationsItem}
              keyExtractor={(item) => item.id.toString()}
              style={{ flex: 3 }}
            />       
        </View>
      </View>
    );
  };
  export default OrderList;