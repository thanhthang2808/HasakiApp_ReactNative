import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useDispatch } from "react-redux";
import Toast from 'react-native-toast-message';
import { addToCart, cartSlice } from '../redux/CartReducer';

const ProductDetail = ({ route }) => {
  const { product } = route.params;
  const dispatch = useDispatch();

  const addItemToCart = (product) => {
    Toast.show({
      type: 'success',
      text1: 'Thêm thành công vào giỏ hàng!',
      text2: `${product.name}`
    });
    dispatch(addToCart(product));
  };

  return (
    <View>
      <Text>Product Detail Screen for ID: {product.id}</Text>
      <Image source={product.image} style={{ width: 90, height: 90, resizeMode: 'contain' }} defaultSource={require("../assets/notfound.png")}/>
      <Pressable
        style={{
          width: 150,
          height: 50,
          backgroundColor: 'orange',
          color: 'white',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => addItemToCart(product)}
      >
        <Text style={{ color: 'white' }}>Thêm vào giỏ hàng</Text>
      </Pressable>
    </View>
  );
};

export default ProductDetail;
