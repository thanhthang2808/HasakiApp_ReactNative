import * as React from 'react';
import { useState } from 'react';
import { Text, View, Image, Pressable, SafeAreaView } from 'react-native';
import { Divider, PaperProvider } from 'react-native-paper';
import IPv4Address from '../ipAddress/IPv4Address';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


export default function Account({ navigation, route }) {

    const [logged, setLogged] = useState('false')
    const [user, setUser] = useState(undefined)


    useFocusEffect(
        React.useCallback(() => {
            if (route.params) {
                const { username } = route.params;
                const ip = IPv4Address();
                const url = `http://${ip}:3000/user`;
                fetch(url)
                    .then((response) => response.json())
                    .then((users) => {
                        const foundUser = users.find(
                            (user) => user.email === username
                        );
                        setLogged(true)
                        setUser(foundUser)
                        console.log(foundUser)
                    }).catch(console.error)
            }
        }, [])
    );

    const handleLogout = async (navigation) => {
        try {
            await AsyncStorage.removeItem("id");
            navigation.navigate('Login')
        } catch (error) {
            console.error(error);
        }
    }

    const componentWhenUserFound = () => (
        <>
            <View style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <View style={{
                    width: '100%'
                }}>
                    <Pressable style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }} onPress={() => {
                        navigation.push('UserInformation', { user: user })

                    }}>
                        <Image style={{
                            height: 30,
                            width: 30,
                            marginLeft: 5,
                            marginTop: 5,
                            tintColor: 'white'
                        }} source={require('../assets/user.png')} />
                        <Text style={{
                            color: 'white',
                            marginLeft: 5,
                            marginTop: 10,
                        }}>{user.name}</Text>
                    </Pressable>
                </View>

                <View style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end'
                }}>
                    <Pressable style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 30
                    }} onPress={() => handleLogout(navigation)}>

                        <Text style={{
                            color: 'white',
                            marginLeft: 5,
                            marginTop: 10,
                        }}>Logout</Text>
                        <Image style={{
                            height: 30,
                            width: 30,
                            marginLeft: 5,
                            marginTop: 5,
                            tintColor: 'white'
                        }} source={require('../assets/logout.png')} />
                    </Pressable>
                </View>

            </View>
            {/* <Pressable style={{
                display: 'flex',
                flexDirection: 'row',
            }} onPress={() => {
                navigation.push('UserInformation', { user: user })

            }}>
                <Image style={{
                    height: 30,
                    width: 30,
                    marginLeft: 5,
                    marginTop: 5,
                    tintColor: 'white'
                }} source={require('../assets/user.png')} />
                <Text style={{
                    color: 'white',
                    marginLeft: 5,
                    marginTop: 10,
                }}>{user.name}</Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end'

                }}>
                    <Pressable style={{
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end'
                    }}>
                        <Text style={{
                            color: 'white',
                        }}>Logout</Text>
                    </Pressable>
                </View>

            </Pressable> */}
        </>);

    const componentWhenUserNotFound = () => (<>
        <Pressable style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 8,
            paddingRight: 8,

            paddingTop: 8,
            paddingBottom: 8
        }} onPress={() => navigation.navigate('Login')}>
            <Text style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
            }}>Login</Text>
        </Pressable>

        <Divider style={{ width: 1, height: '100%' }} />

        <Pressable style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',


            paddingLeft: 8,
            paddingRight: 8,

            paddingTop: 8,
            paddingBottom: 8

        }} onPress={() => {
            navigation.push('Signup')
        }}>
            <Text style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
            }}>Sign up</Text>
        </Pressable>
    </>);

    return (
        <PaperProvider>
            <SafeAreaView style={{
                backgroundColor: '#306E51',

            }}>
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: '#306E51',
                    marginTop: 10
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flex: 1
                    }}>
                        {/* <Image
                            style={{
                                width: 40, height: 40,
                            }}
                            source={require('../assets/logo.png')}
                        /> */}

                        <Text style={
                            {

                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                color: 'white',
                                fontSize: 18,
                                fontWeight: 700,
                                marginRight: 25,
                                marginTop: 15
                            }
                        }>QUẢN LÍ TÀI KHOẢN</Text>

                    </View>

                </View>
                <View style={{
                    display: "flex",
                    flexDirection: 'row',
                    gap: 20,

                    marginTop: 16,
                    marginLeft: 16,
                    marginBottom: 16,

                    backgroundColor: '#306E51',
                }}>
                    {user ? componentWhenUserFound() : componentWhenUserNotFound()}
                </View>
            </SafeAreaView>
        </PaperProvider>

    )
}
