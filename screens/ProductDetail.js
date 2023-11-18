import React from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import Toast from 'react-native-toast-message';
import { addToCart } from '../redux/CartReducer';

const ProductDetail = ({ route }) => {
  const { product } = route.params;
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const addItemToCart = (product) => {
    Toast.show({
      type: 'success',
      text1: 'Thêm thành công vào giỏ hàng!',
      text2: `${product.name}`
    });
    dispatch(addToCart(product));
    console.log(cart);
  };

  return (
    <View style={{ height: '100%', backgroundColor: '#FFF' }}>
    <ScrollView>
      {/* Content */}
      <View style={{ backgroundColor: '#DDD', flex: 1 }}>
      <Image source={{uri: product.image}} style={{ width: '100%', height: 300, resizeMode: 'contain', backgroundColor: '#FFF' }} defaultSource={require("../assets/notfound.png")}/>
      <View style={{ width: '100%', padding: 10, backgroundColor: '#F5F5F5', flexDirection: 'row', alignItems: 'baseline' }}>
        <Text style={{ color: '#FF5C00', fontWeight: 'bold', fontSize: 18 }}>{formatCurrency(product.price)} đ</Text>
        <Text style={{ color: 'gray', fontSize: 11, textDecorationLine: 'line-through', marginLeft: 10 }}>{formatCurrency(product.price*2)} đ</Text>
        <Text style={{ color: '#FFF', backgroundColor: '#FF5C00', fontSize: 11, marginLeft: 5, borderRadius: 2, padding: 1 }}>-50%</Text>
      </View>
      <View style={{ padding: 5, flexDirection: 'row', alignItems: 'flex-end', width: '100%', backgroundColor: '#FFF' }}>
        <Image source={require("../assets/nowfree.png")} style={{ height: 18, width: 70, resizeMode: 'contain', marginRight: 10 }}/>
        <Text style={{ color: '#306E51', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' }}>{product.brand}</Text>
      </View>
      <View style={{ paddingHorizontal: 10, backgroundColor: '#FFF' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{product.name}</Text>
      </View>
      <View style={{ padding: 5, paddingHorizontal: 5, backgroundColor: '#FFF', marginTop: 10 }}>
        <View style={{ flexDirection: 'row' }}>
        <Image source={require("../assets/nowfree.png")} style={{ height: 15, width: 50, resizeMode: 'contain', marginRight: 10 }}/>
        <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Giao Nhanh Miễn Phí Trong Vòng 2H</Text>
        </View>
        <Text style={{ flexWrap: 'wrap', fontSize: 12, paddingTop: 5 }}>Bạn muốn nhận hàng trước 15h hôm nay (Miễn phí). Đặt hàng trong 41 phút tới và chọn giao hàng 2H ở bước thanh toán.</Text>
      </View>
      </View>      
    </ScrollView>
    {/* FooterButton */}
    <View>
    <Pressable
      style={{
        width: 150,
        height: 50,
        backgroundColor: 'green',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onPress={() => addItemToCart(product)}
    >
      <Text style={{ color: 'white' }}>Thêm vào giỏ hàng</Text>
    </Pressable>
    </View>
    </View>
  );
};

export default ProductDetail;
