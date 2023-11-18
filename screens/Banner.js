import React, { useRef, useEffect } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions } from 'react-native';
import Menu from './Menu';

export default function Banner() {
    const data = [
        { id: 1, imageUrl: require('../assets/banner1.jpg') },
        { id: 2, imageUrl: require('../assets/banner2.jpg') },
        { id: 3, imageUrl: require('../assets/banner3.jpg') },
        { id: 4, imageUrl: require('../assets/banner4.jpg') },
        { id: 5, imageUrl: require('../assets/banner5.jpg') },
    ];

    const flatListRef = useRef(null);
    const windowWidth = Dimensions.get('window').width;

    useEffect(() => {
        const timer = setInterval(() => {
            if (flatListRef.current) {
                const nextIndex = Math.floor(flatListRef.current._listRef._scrollMetrics.offset / (windowWidth - 20)) + 1;
                flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
            }
        }, 3000); // Scroll every 1 second

        return () => {
            clearInterval(timer);
        };
    }, []);

    const renderItem = ({ item }) => {
        const imageHeight = (windowWidth) * (9 / 16);

        return (
            <View style={[styles.bannerItem, { width: windowWidth - 20, height: imageHeight - 40 }]}>
                <Image source={item.imageUrl} style={styles.bannerImage} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={data}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                onScroll={event => {
                    const currentIndex = Math.floor(event.nativeEvent.contentOffset.x / (windowWidth + 10));

                }}
                getItemLayout={(_, index) => ({
                    length: windowWidth - 20,
                    offset: (windowWidth - 20) * index,
                    index,
                })}
                initialNumToRender={data.length}
                onEndReached={() => {
                    flatListRef.current?.scrollToIndex({ animated: true, index: 0 });
                }}
                onEndReachedThreshold={0.5}
                removeClippedSubviews
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(48, 110, 81)'
    },
    bannerItem: {
        justifyContent: 'center',
        marginHorizontal: 1,
        padding: 7,
        width: '100%',
        backgroundColor: 'rgb(48, 110, 81)'

    },
    bannerImage: {
        flex: 1,
        resizeMode: 'cover',
        borderRadius: '15px'
    },
});