import { useEffect, useState } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions, Text } from 'react-native';
import { ScrollView } from 'react-native-web';


const ItemProduct = (props) => {
    const { id, name, description, price, img } = props
    const windowWidth = Dimensions.get('window').width;
    const imageHeight = (windowWidth - 20) * (9 / 16);
    return (
        <View style={[styles.bannerItem,
        {
            width: windowWidth / 2.5,
            height: imageHeight + 10
        }]}>
            {/* <Image source={img} style={styles.bannerImage} /> */}
            <Text>{price}</Text>
            <Text>{name}</Text>
        </View>
    )
}

const ListProduct = () => {
    const temp = [
        {
            id: 1,
            imageUrl: require('../assets/kemDuongKlair.jpg'),
            price: '375.000',
            name: 'Kem duong am'

        }
    ];

    var [dt, setDT] = useState([])
    var data = [];
    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(json => {
                setDT(json)
            });
    }, []);

    const choose = (item) => {
        dt.map((item) => {
            return (
                <ItemProduct
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    img={item.img}
                />
            )
        })
    }

    return (
        <View style={styles.container}>

            <Text style=
                {{
                    color: '#ff235c',
                    fontSize: '16px',
                    fontWeight: '700',
                    marginLeft: '10px'

                }}>DEALS NỔI BẬT</Text>
            <View style={{
                flexDirection: 'row'
            }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {dt.map((item) => {
                        return (
                            <ItemProduct
                                id={item.id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                img={item.img}
                                key={item.id}
                            />
                        )
                    })}
                </ScrollView>
            </View>
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

    itemProduct: {
        marginHorizontal: 10,
        padding: '10px',
        border: '1px solid black',
        display: 'flex',

    }

});
export default ListProduct;