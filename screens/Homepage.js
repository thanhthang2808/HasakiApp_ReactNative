import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FlatList } from 'react-native';
import Menu from './Menu';

const Banner = () => {
    const data = [
        { id: 1, imageUrl: require('../assets/banner1.jpg') },
        { id: 2, imageUrl: require('../assets/banner2.jpg') },
        { id: 3, imageUrl: require('../assets/banner3.jpg') },
        { id: 4, imageUrl: require('../assets/banner4.jpg') },
        { id: 5, imageUrl: require('../assets/banner5.jpg') },

    ];

    const renderItem = ({ item }) => (
        <View style={styles.bannerItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.bannerImage} />
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
            />
        </View>
    );
};

const CountdownTimer = () => {
    const [seconds, setSeconds] = useState(180); // 10 minutes in seconds
  
    useEffect(() => {
      const timer = setTimeout(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          setSeconds(180); // Reset to 10 minutes when countdown reaches zero
        }
      }, 1000);
  
      return () => clearTimeout(timer); // Clear the timer on component unmount
  
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

// const Menu = () => {
//     const data = [
//         { id: 1, imageUrl: require('../assets/menu1.png') },
//         { id: 2, imageUrl: require('../assets/menu2.png') },
//         { id: 3, imageUrl: require('../assets/menu3.png') },
//         { id: 4, imageUrl: require('../assets/menu4.png') },
//         { id: 5, imageUrl: require('../assets/menu5.png') },
//         { id: 6, imageUrl: require('../assets/menu6.png') },
//         { id: 7, imageUrl: require('../assets/menu7.png') },
//         { id: 8, imageUrl: require('../assets/menu8.png') },
//         { id: 9, imageUrl: require('../assets/menu9.png') },
//         { id: 10, imageUrl: require('../assets/menu10.png') },
//     ];


//     const renderItem = ({ item }) => (
//         <View style={styles.bannerItem}>
//             <Image source={{ uri: item.imageUrl }} style={styles.menuImage} />
//         </View>
//     );

//     return (
//         <View style={styles.menu}>
//             <FlatList
//                 data={data}
//                 keyExtractor={(item) => item.id.toString()}
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 renderItem={renderItem}

//             />
//         </View>
//     );
// };


export default function Homepage() {
    return (
        <View>
            <Banner />
            <Menu />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                <Text>Flash deals</Text>
                <CountdownTimer />
            </View>
        </View>

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
        borderRadius: '20px'


    },
    bannerItem: {
        marginHorizontal: 10,
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
