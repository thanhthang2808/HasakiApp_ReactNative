import { useEffect, useState } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions, Text } from 'react-native';
import { ScrollView } from 'react-native';
import fetchProducts from '../fetchData/fetchProducts';
import fetchCategoryHomepage from '../fetchData/fetchCategoryHomepage';


const ItemBanner = (props) => {
    const { name, image, color } = props
    const windowWidth = Dimensions.get('window').width;
    const imageHeight = (windowWidth - 20) * (9 / 16);
    return (
        <View style={
            {
                width: 100,
                height: 135,
                backgroundColor: color,
                borderRadius: 15,
                padding: 6,
                alignItems: 'center',
                justifyContent: 'center',
            }}>

            <Image style={{
                width: 80,
                height: 80,
                margin: 'auto',
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center'
            }} source={{ uri: image }} />
            <Text numberOfLines={2} style={{
                textAlign: 'center',
                paddingTop: 5,
            }}>{name}</Text>
        </View>
    )
}

export default function CategoryHomepage() {
    const data = fetchCategoryHomepage();

    return (
        <View style={{
            marginTop: 30,
        }}>
            <Text style={{

            }}>Danh mục</Text>
            <ScrollView horizontal>
                <FlatList
                    data={data}
                    numColumns={10}
                    renderItem={({ item }) => {
                        return (
                            <View style={{
                                margin: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <ItemBanner name={item.name}
                                    image={item.image} color={item.color} />

                            </View>

                        )
                    }
                    }

                    keyExtractor={item => item.id}>
                </FlatList>
            </ScrollView>
        </View >
    )
}