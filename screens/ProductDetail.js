import React from 'react';
import { View, Text, Image, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import Toast from 'react-native-toast-message';
import { addToCart } from '../redux/CartReducer';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
        <Text style={{ color: '#FF5C00', fontWeight: 'bold', fontSize: 18 }}>{formatCurrency(product.price)} ₫</Text>
        <Text style={{ color: 'gray', fontSize: 11, textDecorationLine: 'line-through', marginLeft: 10 }}>{formatCurrency(product.price*2)} ₫</Text>
        <Text style={{ color: '#FFF', backgroundColor: '#FF5C00', fontSize: 11, marginLeft: 5, borderRadius: 2, padding: 1 }}>-50%</Text>
      </View>
      <View style={{ padding: 5, flexDirection: 'row', alignItems: 'flex-end', width: '100%', backgroundColor: '#FFF' }}>
        <Image source={require("../assets/nowfree.png")} style={{ height: 18, width: 70, resizeMode: 'contain', marginRight: 10 }}/>
        <Text style={{ color: '#306E51', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' }}>{product.brand}</Text>
      </View>
      <View style={{ paddingHorizontal: 10, backgroundColor: '#FFF' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{product.name}</Text>
      </View>
      <View style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'baseline' }}>
        <View style={{ flexDirection: 'row', backgroundColor: '#FF5C00', borderRadius: 2, padding: 2, marginRight: 5 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 10, color: '#FFF' }}>{product.rating}</Text>
        <MaterialCommunityIcons name="star" color="#FFF" size={14} />
        </View>
        <Text style={{ fontSize: 10, color: 'gray' }}>({product.reviews} đánh giá) | {product.comment} Hỏi đáp</Text>
      </View>
      {/* NowFree */}
      <View style={{ padding: 5, paddingHorizontal: 5, backgroundColor: '#FFF', marginTop: 10 }}>
        <View style={{ flexDirection: 'row' }}>
        <Image source={require("../assets/nowfree.png")} style={{ height: 15, width: 50, resizeMode: 'contain', marginRight: 10 }}/>
        <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#333333' }}>Giao Nhanh Miễn Phí Trong Vòng 2H</Text>
        </View>
        <Text style={{ flexWrap: 'wrap', fontSize: 12, paddingTop: 5, color: '#333333' }}>Bạn muốn nhận hàng trước 15h hôm nay (Miễn phí). Đặt hàng trong 41 phút tới và chọn giao hàng 2H ở bước thanh toán.</Text>
      </View>
      {/* Số lượng */}
      <View style={{ padding: 5, paddingHorizontal: 5, backgroundColor: '#FFF', marginTop: 10 }}>
        <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#333333' }}>Số lượng</Text>
        </View>
        <Text style={{ flexWrap: 'wrap', fontSize: 12, paddingTop: 5, color: '#333333' }}>Số lượng hàng còn trong kho: {product.quantity}</Text>
      </View>
      {/* Mô tả */}
      <View style={{ padding: 5, paddingHorizontal: 5, backgroundColor: '#FFF', marginTop: 10 }}>
        <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#333333' }}>Mô tả sản phẩm</Text>
        </View>
        <Text style={{ flexWrap: 'wrap', fontSize: 12, paddingTop: 5, color: '#333333' }}>{product.decription}</Text>
      </View>
      {/* Thông số */}
      <View style={{ padding: 5, paddingHorizontal: 5, backgroundColor: '#FFF', marginTop: 10 }}>
        <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#333333' }}>Thông số sản phẩm</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 20, alignItems: 'baseline'  }}>
          <Text style={{ flexWrap: 'wrap', fontSize: 16, paddingTop: 5, color: '#333333', marginRight: 5 }}>•</Text>
          <Text style={{ flexWrap: 'wrap', fontSize: 12, paddingTop: 5, color: '#333333', width: '40%' }}>Thương hiệu: </Text>
          <Text style={{ flexWrap: 'wrap', fontSize: 12, paddingTop: 5, color: '#333333', width: '60%' }}>{product.brand}</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 20, alignItems: 'baseline'  }}>
          <Text style={{ flexWrap: 'wrap', fontSize: 16, paddingTop: 5, color: '#333333', marginRight: 5 }}>•</Text>
          <Text style={{ flexWrap: 'wrap', fontSize: 12, paddingTop: 5, color: '#333333', width: '40%' }}>Xuất xứ: </Text>
          <Text style={{ flexWrap: 'wrap', fontSize: 12, paddingTop: 5, color: '#333333', width: '60%' }}>{product.origin}</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 20, alignItems: 'baseline'  }}>
          <Text style={{ flexWrap: 'wrap', fontSize: 16, paddingTop: 5, color: '#333333', marginRight: 5 }}>•</Text>
          <Text style={{ flexWrap: 'wrap', fontSize: 12, paddingTop: 5, color: '#333333', width: '40%' }}>Danh mục: </Text>
          <Text style={{ flexWrap: 'wrap', fontSize: 12, paddingTop: 5, color: '#333333', width: '60%' }}>{product.category}</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 20, alignItems: 'flex-start'  }}>
          <Text style={{ flexWrap: 'wrap', fontSize: 16, paddingTop: 5, color: '#333333', marginRight: 5 }}>•</Text>
          <Text style={{ flexWrap: 'wrap', fontSize: 12, paddingTop: 5, color: '#333333', width: '40%', marginTop: 4 }}>Thành phần: </Text>
          <Text style={{ flexWrap: 'wrap', fontSize: 12, paddingTop: 5, color: '#333333', width: '60%', marginTop: 4 }}>{product.ingredient}</Text>
        </View>
      </View>
      {/* Đánh giá */}
      <View style={{ padding: 5, paddingHorizontal: 5, backgroundColor: '#FFF', marginTop: 10 }}>
        <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#333333', marginRight: 5 }}>Đánh giá</Text>
        <Text style={{ fontSize: 14, color: '#333333' }}>({product.reviews})</Text>
        </View>
        <Text style={{ flexWrap: 'wrap', fontSize: 10, paddingTop: 5, color: 'gray' }}>Hình ảnh thực tế của khách hàng</Text>
        <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'center'}}>
          <Image source={require('../assets/meme1.jpg')} style={{ height: 70, width: '15%', marginHorizontal: 3 }}/>
          <Image source={require('../assets/meme2.jpg')} style={{ height: 70, width: '15%', marginHorizontal: 3 }}/>
          <Image source={require('../assets/meme3.jpg')} style={{ height: 70, width: '15%', marginHorizontal: 3 }}/>
          <Image source={require('../assets/meme4.jpg')} style={{ height: 70, width: '15%', marginHorizontal: 3 }}/>
          <Image source={require('../assets/meme5.jpg')} style={{ height: 70, width: '15%', marginHorizontal: 3 }}/>
          <Image source={require('../assets/meme6.jpg')} style={{ height: 70, width: '15%', marginHorizontal: 3 }}/>
        </View>
        <View style={{ paddingHorizontal: 5, paddingTop: 5, flexDirection: 'row', marginTop: 10, alignItems: 'baseline' }}>
          <MaterialCommunityIcons name='star' color="#FF5C00" size={18}/>
          <MaterialCommunityIcons name='star' color="#FF5C00" size={18}/>
          <MaterialCommunityIcons name='star' color="#FF5C00" size={18}/>
          <MaterialCommunityIcons name='star' color="#FF5C00" size={18}/>
          <MaterialCommunityIcons name='star' color="#FF5C00" size={18}/>
          <Text style={{ color: '#333333', fontSize: 12, fontWeight: 'bold', marginLeft: 5 }}>Mai Thanh Thắng</Text>          
        </View>
        <View style={{ paddingHorizontal: 5, alignItems: 'baseline' }}>
          <Text style={{ color: 'gray', fontSize: 11 }}>28-08-2023</Text>
        </View>
        <View style={{ paddingHorizontal: 5, alignItems: 'baseline' }}>
          <Text style={{ color: '#333333', fontSize: 11 }}>Xinh đẹp tuyệt vời!</Text>
        </View>
        <View style={{ paddingHorizontal: 5, paddingTop: 5, flexDirection: 'row', marginTop: 10, alignItems: 'baseline' }}>
          <MaterialCommunityIcons name='star' color="#FF5C00" size={18}/>
          <MaterialCommunityIcons name='star' color="#FF5C00" size={18}/>
          <MaterialCommunityIcons name='star' color="#FF5C00" size={18}/>
          <MaterialCommunityIcons name='star' color="#FF5C00" size={18}/>
          <MaterialCommunityIcons name='star' color="#FF5C00" size={18}/>
          <Text style={{ color: '#333333', fontSize: 12, fontWeight: 'bold', marginLeft: 5 }}>LanTuongXinhDep</Text>          
        </View>
        <View style={{ paddingHorizontal: 5, alignItems: 'baseline' }}>
          <Text style={{ color: 'gray', fontSize: 11 }}>26-10-2023</Text>
        </View>
        <View style={{ paddingHorizontal: 5, alignItems: 'baseline' }}>
          <Text style={{ color: '#333333', fontSize: 11 }}>10 điểm không nói nhiều</Text>
        </View>
        <View style={{ padding: 10, alignItems: 'center' }}>
          <Text style={{ color: '#306E51', fontSize: 12 }}>Xem tất cả</Text>
        </View>       
      </View>
      {/* Hỏi đáp */}
      <View style={{ padding: 5, paddingHorizontal: 5, backgroundColor: '#FFF', marginTop: 10 }}>
        <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#333333', marginRight: 5 }}>Hỏi đáp</Text>
        <Text style={{ fontSize: 14, color: '#333333' }}>({product.comment})</Text>
        </View>
        <View>
          
        </View>
        <View style={{ paddingHorizontal: 5, paddingTop: 5, marginTop: 10, alignItems: 'baseline' }}>
          <Text style={{ color: '#333333', fontSize: 12, fontWeight: 'bold', marginLeft: 5 }}>Võ Quốc Huy</Text> 
          <Text style={{ color: '#333333', fontSize: 11, marginLeft: 5, flexWrap: 'wrap' }}>Cho em xin 1 cái được không shop?</Text>         
        </View>
        <View style={{ paddingHorizontal: 25, paddingTop: 5, marginTop: 10, alignItems: 'baseline' }}>
          <Text style={{ color: '#FFF', fontSize: 12, fontWeight: 'bold', marginLeft: 5, backgroundColor: '#306E51' }}>Admin</Text> 
          <Text style={{ color: '#333333', fontSize: 11, marginLeft: 5, flexWrap: 'wrap', paddingTop: 2 }}>Xã hội này chỉ có làm, chịu khó, cần cù thì bù siêng năng, chỉ có làm thì mới có ăn, những cái loại không làm mà đòi có ăn thì ăn đầu b*** ăn c**! Thế cho nó dễ! Xã hội này không làm thì chỉ có ăn c** thôi. Nói thế cho nó nhanh, cho nó dễ hiểu. Còn xã hội này sống muốn người ta tôn trọng, mình phải tôn trọng người khác trước, muốn người ta quý mình, mình phải quý người ta trước.</Text>         
        </View>  
        <View style={{ paddingHorizontal: 5, paddingTop: 5, marginTop: 10, alignItems: 'baseline' }}>
          <Text style={{ color: '#333333', fontSize: 12, fontWeight: 'bold', marginLeft: 5 }}>Dương Thế Ngọc</Text> 
          <Text style={{ color: '#333333', fontSize: 11, marginLeft: 5, flexWrap: 'wrap' }}>Sản phẩm này có ăn được ko vậy?</Text>         
        </View>
        <View style={{ paddingHorizontal: 25, paddingTop: 5, marginTop: 10, alignItems: 'baseline' }}>
          <Text style={{ color: '#FFF', fontSize: 12, fontWeight: 'bold', marginLeft: 5, backgroundColor: '#306E51' }}>Admin</Text> 
          <Text style={{ color: '#333333', fontSize: 11, marginLeft: 5, flexWrap: 'wrap', paddingTop: 2 }}>Nhà tôi 3 đời bán mỹ phẩm chưa thấy loại nào ăn được chị ạ:)) Hông ấy chị về ướp thêm tí mắm, muối ăn thử đi rồi cho shop feedback chị nhé!</Text>         
        </View>
        <View style={{ padding: 10, alignItems: 'center' }}>
          <Text style={{ color: '#306E51', fontSize: 12 }}>Xem tất cả</Text>
        </View>       
      </View>

      </View>      
    </ScrollView>
    {/* FooterButton */}
    <View style={{
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFF',
      shadowColor: '#000', 
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.25, 
      shadowRadius: 3.84,
    }}>
    <TouchableOpacity
      style={{
        backgroundColor: '#FF5C00',
        width: '85%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        flexDirection: 'row',
      }}
      onPress={() => addItemToCart(product)}
    >
      <MaterialCommunityIcons name='cart-plus' color="#FFF" size={25}/>
      <View style={{ alignItems: 'center' }}>
      <Text style={{ color: 'white', marginLeft: 10, fontSize: 16 }}>Mua online</Text>
      <Text style={{ color: 'white', marginLeft: 10, fontSize: 10 }}>NowFree 2H</Text>
      </View>
    </TouchableOpacity>
    </View>
    </View>
  );
};

export default ProductDetail;
