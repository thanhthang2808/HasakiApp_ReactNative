import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import data from '../data/db.json'

const productsData = data.products;
const categoryData = data.category;

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState(categoryData[0]);
  const filteredProducts = productsData.filter(productsData => productsData.category === selectedCategory.category);
  const navigation = useNavigation();
  console.log('selectedCategory:', selectedCategory);
  console.log('filteredProducts:', filteredProducts);

  const getRandomProducts = (productsData, count) => {
    const shuffled = productsData.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomProducts = getRandomProducts(productsData, 12);
  console.log(randomProducts);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedCategory(item)}>
      <View style={{ flex: 1, minHeight: 50, justifyContent: 'center', padding: 10, borderLeftWidth: 3, backgroundColor: item.id === selectedCategory.id ? '#FFF' : '#EEEEEE', borderLeftColor: item.id === selectedCategory.id ? '#FF5C00' : '#EEEEEE', borderBottomWidth: 1, borderBottomColor: "#DDD" }}>
        <Text style={{fontSize: 10, flexWrap: 'wrap', color: item.id === selectedCategory.id ? '#FF5C00' : '#111111'}}>{item.category}</Text>
      </View>
    </TouchableOpacity>
    );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })} style={{ width: '33%', height: 150, padding: 10, alignItems: 'center'}}>
      <Image source={item.image} style={{ width: 90, height: 90, resizeMode: 'contain' }} defaultSource={require("../assets/notfound.png")}/>
      <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 11, textAlign: 'center' }}>{item.name}</Text>
    </TouchableOpacity>
    );

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={categoryData}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id.toString()}
          style={{ flex: 1, borderRightWidth: 1, borderColor: '#ddd' }}
        />
      </View>
      <View style={{ flex: 3 }}>
        {selectedCategory.category === "Hasaki Deals" ? (
          <FlatList
          data={randomProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          style={{ flex: 3, backgroundColor: '#FFF'}}
          numColumns={3}
        />
        ) : (
          <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          style={{ flex: 3, backgroundColor: '#FFF'}}
          numColumns={3}
        />
        )}        
      </View>      
    </View>
  );
};

export default Category;
