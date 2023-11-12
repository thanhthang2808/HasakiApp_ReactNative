import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FlatList } from 'react-native';
import Menu from './Menu';
import Banner from './Banner';
import ListProduct from './ListProductHomepag';

export default function Homepage() {
    return (
        <View>
            <Banner />
            <Menu />
            <ListProduct />
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
        borderRadius: '20px',
        flex: 1


    },
    bannerItem: {
        flex: 1, // Takes the full width of the FlatList
        aspectRatio: 16 / 9, // Adjust the aspect ratio to match your image dimensions
        marginRight: 10,
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