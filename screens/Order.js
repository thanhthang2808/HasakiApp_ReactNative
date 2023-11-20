import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import IPv4Address from '../ipAddress/IPv4Address';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderList = () => {
  const [ordersData, setOrders] = useState([]);
  const [orderTotals, setOrderTotals] = useState({}); // Đối tượng để lưu trữ tổng tiền cho mỗi orderId
  const ip = IPv4Address();
  const url = `http://${ip}:3000/orders`;

  useFocusEffect(
    useCallback(() => {
      const fetchOrderData = async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();

          const userId = await AsyncStorage.getItem('id');

          console.log(userId);

          if (!userId) {
            console.error('Error adding cart: userId undefined');
            return;
          }

          const filteredOrders = data.filter(order => order.userId === userId);

          setOrders(filteredOrders);
        } catch (error) {
          console.error(error);
        }
      }

      fetchOrderData();
    }, [])
  );

  // useEffect(() => {
  //   const fetchOrderData = async () => {
  //     try {
  //       const response = await fetch(url);
  //       const data = await response.json();

  //       const userId = await AsyncStorage.getItem('id');

  //       console.log(userId);

  //       if (!userId) {
  //         console.error('Error adding cart: userId undefined');
  //         return;
  //       }

  //       const filteredOrders = data.filter(order => order.userId === userId);

  //       setOrders(filteredOrders);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   fetchOrderData();
  // }, []);

  // Tính tổng tiền cho mỗi orderId khi có sự thay đổi trong danh sách đơn hàng
  useEffect(() => {
    const calculateOrderTotals = () => {
      const totals = {};
      ordersData.forEach(order => {
        const orderId = order.orderId;
        const orderTotal = order.orderOfUser.reduce((total, item) => total + item.price * item.quantity, 0);
        totals[orderId] = orderTotal;
      });
      setOrderTotals(totals);
    };

    calculateOrderTotals();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 20, padding: 10, borderWidth: 3, borderColor: 'orange', borderStyle: 'dashed' }}>
      <Text style={{ fontWeight: 'bold' }}>Order ID: {item.orderId}</Text>
      <Text style={{ fontWeight: 'bold' }}>User ID: {item.userId}</Text>
      <Text style={{ fontWeight: 'bold' }}>Products:</Text>
      <FlatList
        data={item.orderOfUser}
        keyExtractor={(product) => product.idProduct}
        renderItem={({ item: product, index }) => (
          <View style={{ marginLeft: 10 }}>
            <Text>{index + 1}. {product.nameProduct}</Text>
            <Text>Quantity: {product.quantity}</Text>
            <Text>Price: {product.price}</Text>
          </View>
        )}
      />
      <Text style={{ fontWeight: 'bold' }}>Tổng tiền: {orderTotals[item.orderId]}</Text> {/* Hiển thị tổng tiền cho từng orderId */}
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={ordersData}
        keyExtractor={(order) => order.orderId}
        renderItem={renderItem}
      />
    </View>
  );
};

export default OrderList;