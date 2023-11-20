import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { FlatList } from 'react-native';
import Menu from './Menu';
import Banner from './Banner';
import ListProduct from './ListProductHomepag';
import CategoryHomepage from './CategoryHomepage';
import { useSelector } from 'react-redux';


export default function Homepage() {
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  
  return (
    <ScrollView>
      <View>
        <View style={{
          backgroundColor: 'rgb(48, 110, 81)'
        }}>
          <Banner />
          <Menu />
        </View>
        <ListProduct />
        <CategoryHomepage />
      </View>
    </ScrollView>

  )
}

