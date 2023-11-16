import { useEffect, useState } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions, Text } from 'react-native';
import { ScrollView } from 'react-native';


const ItemBanner = (props) => {
    const { name, image, color } = props
    const windowWidth = Dimensions.get('window').width;
    const imageHeight = (windowWidth - 20) * (9 / 16);
    return (
        <View style={
            {
                width: '100px',
                height: 135,
                backgroundColor: color,
                borderRadius: '15px',
                padding: '6px'

            }}>

            <Image style={{
                width: '80px',
                height: '80px',
                margin: 'auto',
                borderRadius: '15px',
                alignItems: 'center',
                justifyContent: 'center'
            }} source={{ uri: image }} />
            <Text style={{
                textAlign: 'center'
            }}>{name}</Text>
        </View>
    )
}

export default function CategoryHomepage() {
    var [dt, setDT] = useState([])
    var data = [];
    useEffect(() => {
        fetch('http://localhost:3000/categoryHomepage')
            .then(response => response.json())
            .then(json => {
                setDT(json)
            });
    }, []);

    const choose = (item) => {
        dt.map((item) => {
            return (
                <ItemBanner
                    name={item.name}
                    image={item.image}
                    color={item.color}
                />
            )
        })
    }
    return (
        <View style={{
            marginTop: '30px',
        }}>
            <ScrollView horizontal>
                <FlatList
                    numColumns={'10'}
                    data={dt}
                    renderItem={({ item }) => {
                        return (
                            <View style={{
                                margin: '5px'
                            }}>

                                <ItemBanner name={item.name}
                                    image={item.image} color={item.color} />

                            </View>

                        )
                    }
                    }

                    keyExtractor={item => item.id}>
                    {/* <View style={{
                        flexDirection: 'row',
                        marginTop: '10px'

                    }}>

                        {dt.map((item) => {
                            return (
                                <ItemBanner
                                    name={item.name}
                                    image={item.image}
                                    key={item.id}
                                />
                            )
                        })}

                    </View> */}
                </FlatList>
            </ScrollView>


        </View >
    )
}