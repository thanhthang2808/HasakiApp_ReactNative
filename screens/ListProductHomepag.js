import { useEffect, useState } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions, Text } from 'react-native';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import fetchProducts from '../fetchData/fetchProducts';

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
            <View style={{ flexDirection: 'row', padding: 10 }}>
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

const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const ProgressBarComponent = () => {
    const [progress, setProgress] = useState(0);
    const completionTimeInSeconds = 180; // Thời gian hoàn thành mong muốn trong giây
    const fillColor = "#FA690F"; // Màu sắc cho thanh tiến trình

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                const newProgress = prevProgress + 1 / completionTimeInSeconds;
                return newProgress > 1 ? 0 : newProgress; // Nếu tiến trình vượt quá 1, đặt lại về 0
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={{ alignItems: 'center', marginTop: 10, width: '100%', justifyContent: 'center' }}>
            <ProgressBar
                style={{ height: 10, width: '100%', backgroundColor: '#FFC8A6' }}
                progress={progress}
                color={fillColor}
            />
            <Image
                source={require('../assets/fire3.png')}
                style={{
                    position: 'absolute',
                    top: -10,
                    left: progress * 81 + '%',
                    width: 25,
                    height: 25,
                }}
            />
        </View>
    );
};
// Flash Deals
const ItemProduct = (props) => {
    const { id, name, description, price, image } = props
    return (
        <View style={[styles.bannerItem,
        {
            width: 150,
            height: 260,
        }]}>
            <Image style={{
                height: 150,
                

            }} source={{ uri: image }} />

            <Text style={{
                color: '#fa690f',
                fontWeight: '700',
            }}>{formatCurrency(price)} ₫</Text>

            <Text numberOfLines={2}>{name}</Text>
            <ProgressBarComponent />
        </View>
    )
}

const ListProduct = () => {
    const dt = fetchProducts();

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
                    height: 350,
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                        <Text style={{ color: 'white' }}>Flash deals</Text>
                        <CountdownTimer />
                    </View>
                    <ScrollView horizontal style={styles.scrollView}>
                        <View style={{
                            flexDirection: 'row',
                            marginBottom: 10,                            
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
                marginTop: 10,
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
        gap: 10,

    },
    bannerItem: {
        marginHorizontal: 7,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        

    },
    bannerImage: {
        flex: 1,
        resizeMode: 'contain',
        height: 25,
        alignItems: 'center',
    },

    itemProduct: {
        marginHorizontal: 10,
        padding: 10,
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
        width: 125,
        height: 125,
        borderRadius: 20
    }

});
export default ListProduct;