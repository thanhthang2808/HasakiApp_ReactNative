import { View, Image, FlatList, StyleSheet, Dimensions, Text } from 'react-native';

const ListProduct = () => {
    const data = [
        {
            id: 1,
            imageUrl: require('../assets/kemDuongKlair.jpg'),
            price: '375.000',
            name: 'Kem duong am'

        }
    ];

    const renderItem = ({ item }) => {
        const windowWidth = Dimensions.get('window').width;
        const imageHeight = (windowWidth - 20) * (9 / 16);

        return (

            <View style={[styles.bannerItem, { width: windowWidth / 2.5, height: imageHeight + 10 }]}>
                <Image source={item.imageUrl} style={styles.bannerImage} />
                <Text>{item.price}</Text>
                <Text>{item.name}</Text>
            </View>

        );
    };

    return (
        <View style={styles.container}>

            <Text style=
                {{
                    color: '#ff235c',
                    fontSize: '16px',
                    fontWeight: '700',
                    marginLeft: '10px'

                }}>DEALS NỔI BẬT</Text>


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
        gap: '10px'

    },
    bannerItem: {
        marginHorizontal: 10,
        padding: '10px',
        border: '1px solid black',

    },
    bannerImage: {
        flex: 1,
        resizeMode: 'cover',
        height: '25px'
    },
});
export default ListProduct;