import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

const Menu = () => {
    const data = [
        { id: 1, name: 'Danh mục', imageUrl: require('../assets/menu1.png') },
        { id: 2, name: 'Deals', imageUrl: require('../assets/menu2.png') },
        { id: 3, name: 'Giao 2h', imageUrl: require('../assets/menu3.png') },
        { id: 4, name: 'Clinic & SPA', imageUrl: require('../assets/menu4.png') },
        { id: 5, name: 'Bảng giá', imageUrl: require('../assets/menu5.png') },
        { id: 6, name: 'Tra cứu đơn hàng', imageUrl: require('../assets/menu6.png') },
        { id: 7, name: 'High end', imageUrl: require('../assets/menu7.png') },
        { id: 8, name: ' Mua 1      tặng 1', imageUrl: require('../assets/menu8.png') },
        { id: 9, name: 'Đặt hẹn', imageUrl: require('../assets/menu9.png') },
        { id: 10, name: 'Cẩm nang', imageUrl: require('../assets/menu10.png') },
    ];

    const renderMenuItems = () => {
        return data.map((item) => (
            <View style={styles.menuItem} key={item.id}>
                <Image source={item.imageUrl} style={styles.menuImage} />
                <Text style={{
                    fontSize: '11px',
                    width: '50px',
                    margin: 'auto'
                }}>{item.name}</Text>
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {renderMenuItems().slice(0, 5)}
            </View>
            <View style={styles.row}>
                {renderMenuItems().slice(5, 10)}
            </View>
        </View>
    );
};

export default Menu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        marginTop: '10px'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    menuItem: {
        width: '19%',
        marginBottom: 10,
    },
    menuImage: {
        width: '45px',
        height: '45px',
        resizeMode: 'cover',
        marginLeft: '5px'

    },
});