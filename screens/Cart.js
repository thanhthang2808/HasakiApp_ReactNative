import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather"; 

import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/CartReducer";

const Cart = ({ navigation }) => {
  // Sử dụng useSelector để lấy dữ liệu từ Redux store
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  // Tính tổng tiền sử dụng reduce
  const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

  // Component con để hiển thị thông tin từng sản phẩm trong giỏ hàng
  const Item = ({ item }) => {
    // Các hàm xử lý sự kiện
    const addItemToCart = () => dispatch(addToCart(item));
    const removeItemFromCart = () => dispatch(removeFromCart(item));
    const increaseQuantity = () => dispatch(incrementQuantity(item));
    const decreaseQuantity = () => {
      // Sử dụng parseInt để đảm bảo so sánh với số nguyên
      if (parseInt(item.quantity) === 1) {
        dispatch(removeFromCart(item));
      } else {
        dispatch(decrementQuantity(item));
      }
    };

    return (
      <View style={styles.itemContainer}>
        <View style={styles.productInfo}>
          <Image style={styles.productImage} source={{ uri: item.image }} />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{item.name}</Text>
            <View style={styles.priceContainer}>
              <Feather name="play" style={styles.priceIcon} />
              <Text style={styles.productPrice}>$ {item.price}</Text>
            </View>
          </View>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={increaseQuantity}>
            <AntDesign
              name="plus"
              style={styles.quantityButton}
            />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={decreaseQuantity}>
            <AntDesign
              name="minus"
              style={styles.quantityButton}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      </View>
      <View style={styles.cartContent}>
        {cart.length === 0 ? (
            <View style={styles.emptyCartView}>
                <Image style={{ width: 150, height: 200 }} source={require('../assets/cart_empty.png')}/>
                <Text style={styles.emptyCartText}>Giỏ hàng của bạn chưa có sản phẩm nào</Text>
                <TouchableOpacity style={styles.contShoppingBtn} onPress={() => navigation.navigate('Homepage')}>
                    <Text style={styles.contShoppingText}>Tiếp tục mua sắm</Text>
                </TouchableOpacity>
            </View>
        ) : (
            <View style={styles.footer}>
                <FlatList data={cart} renderItem={({ item }) => <Item item={item} />} />
                <Text style={styles.totalAmount}>Tổng tiền: ${total}</Text>
                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Thanh toán</Text>
                </TouchableOpacity>
            </View>        
        )}
      </View>      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
  },
  cartContent: {
    flexDirection: 'column',
    flex: 1,
    paddingHorizontal: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  productDetails: {
    flexDirection: 'column',
  },
  productName: {
    fontSize: 24,
  },
  priceContainer: {
    flexDirection: 'row',
  },
  priceIcon: {
    fontSize: 20,
  },
  productPrice: {
    fontSize: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 24,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#D0D4CA',
  },
  quantityText: {
    textAlign: 'center',
    width: 40,
    fontSize: 24,
    fontWeight: 'bold',
  },
  emptyCartView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyCartText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalAmount: {
    flex: 40,
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: '#FFF6F6',
  },
  contShoppingBtn: {
    backgroundColor: '#FF5C00',
    width: 330,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    borderRadius: 1,
  },
  contShoppingText: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#FFF',
  },
  checkoutButton: {
    backgroundColor: '#7752FE',
    flex: 60,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  checkoutButtonText: {
    fontSize: 24,
    textTransform: 'uppercase',
  },
});

export default Cart;
