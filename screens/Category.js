import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

const data = [
  { id: 1, category: 'Hasaki Deals', products: [ {name: 'Mỹ Phẩm High-End', image: require('../assets/myphamhighend.jpg')}, {name: 'Chăm sóc da mặt', image: require('../assets/chamsocdamat.jpg')}, {name: 'Trang điểm', image: require('../assets/trangdiem.jpg')}, {name: 'Chăm sóc tóc và da đầu', image: require('../assets/chamsoctocvadadau.jpg')} ] },
  { id: 2, category: 'Mỹ phẩm High-end', products: [ {name: 'Chăm sóc da mặt cao cấp', image: require('../assets/chamsocdamatcaocap.jpg')}, {name: 'Trang điểm cao cấp', image: require('../assets/trangdiemcaocap.jpg')}, {name: 'Chăm sóc tóc cao cấp', image: require('../assets/chamsoctoccaocap.jpg')} ] },
  { id: 3, category: 'Chăm Sóc Da Mặt', products: [ {name: 'Làm sạch da', image: require('../assets/lamsachda.jpg')},
  {name: 'Đặc trị', image: require('../assets/dactri.jpg')},
  {name: 'Dưỡng ẩm', image: require('../assets/duongam.jpg')},
  {name: 'Dưỡng mắt', image: require('../assets/duongmat.jpg')},
  {name: 'Dưỡng môi', image: require('../assets/duongmoi.jpg')},
  {name: 'Mặt nạ', image: require('../assets/matna.jpg')},
  {name: 'Chống nắng da mặt', image: require('../assets/chongnangdamat.jpg')},
  {name: 'Vấn đề về da', image: require('../assets/vandeveda.jpg')},
  {name: 'Dụng cụ chăm sóc da mặt', image: require('../assets/dungcuchamsocdamat.jpg')},
  {name: 'Bộ chăm sóc da mặt', image: require('../assets/bochamsocdamat.jpg')},] },
  { id: 4, category: 'Trang Điểm', products: [] },
  { id: 5, category: 'Chăm Sóc Tóc Và Da Đầu', products: [] },
  { id: 6, category: 'Chăm Sóc Cơ Thể', products: [] },
  { id: 7, category: 'Chăm Sóc Cá Nhân', products: [] },
  { id: 8, category: 'Nước Hoa', products: [] },
  { id: 9, category: 'Thực Phẩm Chức Năng', products: [] },
  { id: 10, category: 'Hasaki Clinic & Spa', products: [] },
  { id: 11, category: 'Giảm Béo', products: [] },
  { id: 12, category: 'Triệt Lông Diode Laser', products: [] },
];

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState(data[0]);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedCategory(item)}>
      <View style={{ flex: 1, minHeight: 50, justifyContent: 'center', padding: 10, borderLeftWidth: 3, backgroundColor: item.id === selectedCategory.id ? '#FFF' : '#EEEEEE', borderLeftColor: item.id === selectedCategory.id ? '#FF5C00' : '#EEEEEE', borderBottomWidth: 1, borderBottomColor: "#DDD" }}>
        <Text style={{fontSize: 10, flexWrap: 'wrap', color: item.id === selectedCategory.id ? '#FF5C00' : '#111111'}}>{item.category}</Text>
      </View>
    </TouchableOpacity>
    );

  const renderProductItem = ({ item }) => (
    <View style={{ width: "33%", height: 120, padding: 10, alignItems: 'center'}}>
        <Image source={item.image} style={{ width: 70, height: 70 }} />
        <Text style={{fontSize: 11, textAlign: 'center'}}>{item.name}</Text>
    </View>
    );

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id.toString()}
          style={{ flex: 1, borderRightWidth: 1, borderColor: '#ddd' }}
        />
      </View>
      <View style={{ flex: 3 }}>
        <FlatList
          data={selectedCategory.products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item}
          style={{ flex: 3, backgroundColor: '#FFF'}}
          numColumns={3}
        />
      </View>      
    </View>
  );
};

export default Category;
