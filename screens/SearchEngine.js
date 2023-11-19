import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RatingStars from './RatingStars';
import fetchProducts from '../fetchData/fetchProducts';

const SearchEngine = ({ route }) => {
  const navigation = useNavigation();
  const { keyword } = route.params;
  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  console.log(keyword);

  const productsData = fetchProducts();
  const filteredResults = productsData.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()));
  console.log(filteredResults);

  const renderProductItem = ({ item }) => (
    <View style={{ width: '50%', padding: 5, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.15, shadowRadius: 2.0 }}>
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })} style={{ padding: 10, alignItems: 'center', backgroundColor: '#FFF'}}>
        <Image source={{ uri: item.image }} style={{ width: 170, height: 170, resizeMode: 'contain' }} defaultSource={require("../assets/notfound.png")}/>
        <View style={{ alignItems: 'flex-start', width: '100%', paddingTop: 5 }}>
          <Text style={{ color: '#FF5C00', fontSize: 13, fontWeight: 'bold', textAlign: 'left' }}>{formatCurrency(item.price)} ₫</Text>
          <Text style={{ color: '#306E51', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'left' }}>{item.brand}</Text>
          <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 11, textAlign: 'left' }}>{item.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', paddingTop: 5 }}>
          <RatingStars rating={item.rating}/>
          <Text style={{ color: 'gray', fontSize: 10, marginLeft: 5 }}>({item.reviews})</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
    );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center', padding: 10, backgroundColor: '#FFF' }}>
        <Text style={{ color: '#306E51', fontSize: 12 }}>Kết quả tìm kiếm cho: '{keyword}'</Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {filteredResults.length === 0 ? (
          <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFF', marginTop: 10, paddingTop: '30%' }}>
            <Image source={require('../assets/searchfail.jpg')} style={{ height: 200, width: 200, resizeMode: 'contain' }}/>
            <Text style={{ fontSize: 16, color: 'gray', paddingTop: 20 }}>Không tìm thấy sản phẩm</Text>
          </View>
        ) : (
          <FlatList
            data={filteredResults}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id.toString()}
            style={{ flex: 3 }}
            numColumns={2}
          />
        )}        
      </View>
    </View>
  );
};

export default SearchEngine;
