import { useEffect, useState } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions, Text } from 'react-native';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ProgressBar, MD3Colors } from 'react-native-paper';

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

const ProgressBarComponent = () => {
    const [progress, setProgress] = useState(0);
    const completionTimeInSeconds = 180; // Set the desired completion time in seconds
    const fillColor = '#fa690f'; // Set the desired fill color for the progress bar


    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                const newProgress = prevProgress + 1 / completionTimeInSeconds;
                return newProgress > 1 ? 1 : newProgress;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    return (
        <View style={{ alignItems: 'center', marginTop: 10 }}>
            <ProgressBar style={{
                height: 10,
                backgroundColor: '#ffc8a6'
            }} progress={progress} color={fillColor} />
            <Image
                source={require('../assets/fire3.png')}
                style={{
                    position: 'absolute',
                    top: -10,
                    left: progress * 60 + '%',
                    width: 25,
                    height: 25,
                }}
            />
        </View>
    );
};
const ItemProduct = (props) => {
    const { id, name, description, price, image } = props
    const windowWidth = Dimensions.get('window').width;
    const imageHeight = (windowWidth - 20) * (9 / 16);
    return (
        <View style={[styles.bannerItem,
        {
            width: windowWidth / 2.5,
            height: imageHeight + 20
        }]}>
            {/* <Image source={img} style={styles.bannerImage} /> */}
            <Image style={{
                height: '150px',
                width: '150px',

            }} source={{ uri: image }} />

            <Text style={{
                color: '#fa690f',
                fontWeight: '700'
            }}>{price} đ </Text>

            <Text numberOfLines={2}>{name}</Text>
            <ProgressBarComponent />
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
                    image={item.image}
                />
            )
        })
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF8E4D', '#fff']}>
                <View style={{
                    backgroundColor: 'linear-gradient(#FFFFFF, #FF8E4D)',
                    height: '350px'
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                        <Text>Flash deals</Text>
                        <CountdownTimer />
                    </View>
                    <ScrollView horizontal style={styles.scrollView}>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: '10px'

                        }}>

                            {dt.map((item) => {
                                return (
                                    <ItemProduct
                                        id={item.id}
                                        name={item.name}
                                        description={item.description}
                                        price={item.price}
                                        image={item.image}
                                        key={item.id}
                                    />
                                )
                            })}

                        </View>
                    </ScrollView>

                </View>

            </LinearGradient>


            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '20px'
            }}>
                <Image style={styles
                    .midBanner} source={require('../assets/banner_mid1.jpg')}></Image>
                <Image style={styles
                    .midBanner} source={require('../assets/banner_mid2.jpg')}></Image>
                <Image style={styles
                    .midBanner} source={require('../assets/banner_mid3.png')}></Image>
            </View>
        </View>
    );

};
const styles = StyleSheet.create({
    container: {
        gap: '10px',


    },
    bannerItem: {
        marginHorizontal: 7,
        padding: '10px',
        borderRadius: '15px',
        backgroundColor: 'white'

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
    ,
    scrollView: {
        marginHorizontal: 5,
    },
    text: {
        fontSize: 42,
    },

    midBanner: {
        width: '125px',
        height: '125px',
        borderRadius: '20px'
    }

});
export default ListProduct;