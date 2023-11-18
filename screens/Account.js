import * as React from 'react';
import { useState } from 'react';
import { Text, View, Image, TextInput, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Divider, PaperProvider } from 'react-native-paper';
import Login from './Login';


export default function Account({ navigation, route }) {

    const [logged, setLogged] = useState('false')
    const [user, setUser] = useState(undefined)


    useFocusEffect(
        React.useCallback(() => {
            console.log('Hello 0-0', route)
            if (route.params) {
                const { username } = route.params;
                fetch('http://localhost:3000/user')
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

    console.log(user)
    const componentWhenUserFound = () => <View style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#306E51',
        height: '40px'

    }}>
        <Image style={{
            height: '30px',
            width: '30px',
            marginLeft: '5px',
            marginTop: '5px',
        }} source={require('../assets/user.png')} />
        <Text style={{
            color: 'white',
            marginLeft: '5px',
            marginTop: '10px',
        }}>{user.name}</Text>
    </View>

    const componentWhenUserNotFound = () => <View style={{
        backgroundColor: '#306E51',
        display: "flex",
        flexDirection: 'row',
        gap: '20px',
        height: '40px'
    }}>
        <Pressable style={{}} onPress={() => navigation.navigate('Login')}>
            <Text style={{
                color: 'white',
                marginTop: '5px',
                marginLeft: '10px'
            }}>Login</Text>
        </Pressable>

        <Divider leftInset='true' />

        <Pressable style={{}} onPress={() => {
            navigation.push('Signup')
        }}>
            <Text style={{
                color: 'white',
                marginTop: '5px',
            }}>Sign up</Text>
        </Pressable>
    </View>

    return (
        <PaperProvider>
            <SafeAreaView style={{
                backgroundColor: '#306E51'
            }}>
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'center',

                    backgroundColor: '#306E51', height: '64px', width: '428px',
                }}>
                    <Image
                        style={{
                            width: '40px', height: '40px',
                            marginRight: '20px'
                        }}
                        source={require('../assets/logo.png')}
                    />

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginRight: 15 }}>
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', backgroundColor: "#FFF",
                            borderRadius: 20, marginLeft: 10,
                            paddingVertical: 8, paddingHorizontal: 10, width: "60%", height: "10%"
                        }}>
                            <MaterialCommunityIcons name="magnify" color="gray" size={18} />
                            <TextInput
                                placeholder="Tìm kiếm"
                                placeholderTextColor="gray"
                                style={{ flex: 1, height: 25, fontSize: 11, marginLeft: 5, width: "80%" }}
                            />
                        </View>
                    </View>

                </View>
                {user ? componentWhenUserFound() : componentWhenUserNotFound()}
                <View>
                    {/* <Render /> */}


                </View>
            </SafeAreaView>
        </PaperProvider>

    )
}
