import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, FlatList, Animated } from "react-native";
import Slide from "./Slide";

const { width } = Dimensions.get("window");

const data = [
    { id: 1, imageUrl: require('../assets/banner1.jpg') },
    { id: 2, imageUrl: require('../assets/banner2.jpg') },
    { id: 3, imageUrl: require('../assets/banner3.jpg') },
    { id: 4, imageUrl: require('../assets/banner4.jpg') },
    { id: 5, imageUrl: require('../assets/banner5.jpg') },
];

const Banner = () => {
  const scrollX = new Animated.Value(0);
  const position = Animated.divide(scrollX, width);
  const [dataList, setDataList] = useState(data);

  useEffect(() => {
    setDataList(data);
    const cleanup = infiniteScroll();
    return cleanup;
  }, [data]);

  let flatListRef;

  function infiniteScroll() {
    const numberOfData = dataList.length;
    let scrollValue = 0,
      scrolled = 0;

    const intervalId = setInterval(function () {
      scrolled++;
      if (scrolled < numberOfData) {
        scrollValue = scrollValue + width;
      } else {
        // Đã chuyển qua tất cả ảnh, quay lại ảnh đầu tiên
        scrollValue = 0;
        scrolled = 0;
      }

      flatListRef?.scrollToOffset({ animated: true, offset: scrollValue });
    }, 3000);

    return () => clearInterval(intervalId);
  }

  if (dataList && dataList.length) {
    return (
      <View>
        <FlatList
          data={dataList}
          ref={(flatList) => {
            flatListRef = flatList;
          }}
          keyExtractor={(item, index) => "key" + index}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <Slide item={item} />;
          }}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}

        />

        <View style={styles.dotView}>
          {dataList.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i}
                style={{
                  opacity,
                  height: 8,
                  width: 8,
                  backgroundColor: "#FFF",
                  marginTop: 5,
                  marginHorizontal: 5,
                  borderRadius: 5,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  dotView: { flexDirection: "row", justifyContent: "center" },
});

export default Banner;
