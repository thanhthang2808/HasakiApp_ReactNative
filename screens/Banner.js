import React from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

export default function Banner() {
    const data = [
        { id: 1, imageUrl: require('../assets/banner1.jpg') },
        { id: 2, imageUrl: require('../assets/banner2.jpg') },
        { id: 3, imageUrl: require('../assets/banner3.jpg') },
        { id: 4, imageUrl: require('../assets/banner4.jpg') },
        { id: 5, imageUrl: require('../assets/banner5.jpg') },
    ];

    const renderItem = ({ item }) => {
        const windowWidth = Dimensions.get('window').width;
        const imageHeight = (windowWidth - 20) * (9 / 16); // Adjust the aspect ratio as needed

        return (
            <View style={[styles.bannerItem, { width: windowWidth - 20, height: imageHeight - 40 }]}>
                <Image source={item.imageUrl} style={styles.bannerImage} />
            </View>
        );
    };

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

const styles = StyleSheet.create({
    container: {

    },
    bannerItem: {
        marginHorizontal: 10,
    },
    bannerImage: {
        flex: 1,
        resizeMode: 'cover',
        height: '25px'
    },
});

