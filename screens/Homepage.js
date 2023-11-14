import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { FlatList } from 'react-native';
import Menu from './Menu';
import Banner from './Banner';
import ListProduct from './ListProductHomepag';

const CountdownTimer = () => {
  const [seconds, setSeconds] = useState(180);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        setSeconds(180);
      }
    }, 1000);

    return () => clearTimeout(timer);

  }, [seconds]);

  const displayTime = () => {
    const hours = Math.floor(seconds / 3600);
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return (
      <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 10 }}>
        <Text style={{ color: 'white', backgroundColor: 'black', borderRadius: 3, fontSize: 14, height: 20, width: 20, textAlign: 'center', marginRight: 5 }}>
          {hours < 10 ? '0' : ''}{hours}
        </Text>
        <Text style={{ color: 'white', backgroundColor: 'black', borderRadius: 3, fontSize: 14, height: 20, width: 20, textAlign: 'center', marginRight: 5 }}>
          {remainingMinutes < 10 ? '0' : ''}{remainingMinutes}
        </Text>
        <Text style={{ color: 'white', backgroundColor: 'black', borderRadius: 3, fontSize: 14, height: 20, width: 20, textAlign: 'center', marginRight: 5 }}>
          {remainingSeconds < 10 ? '0' : ''}{remainingSeconds}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ padding: 10 }}>
      <Text>{displayTime()}</Text>
    </View>
  );
};


export default function Homepage() {
  return (
    <ScrollView>
      <View>

        <Banner />
        <Menu />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
          <Text>Flash deals</Text>
          <CountdownTimer />
        </View>
        <ListProduct />

      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImage: {
    width: 380,
    height: 180,
    resizeMode: 'cover',
    borderRadius: '20px',
    flex: 1


  },
  bannerItem: {
    flex: 1, // Takes the full width of the FlatList
    aspectRatio: 16 / 9, // Adjust the aspect ratio to match your image dimensions
    marginRight: 10,
  },
  menuImage: {
    width: 45,
    height: 45,
    resizeMode: 'cover',
    borderRadius: '20px'


  },
  menu: {
    alignItems: 'center',
    justifyContent: 'center',

  }


});
