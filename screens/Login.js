import { StyleSheet, Text, View, Image, TextInput, Pressable, Alert } from 'react-native';
import { Divider, PaperProvider } from 'react-native-paper';
import { useEffect, useState } from 'react';
import Signup from './Signup';
import React, { createContext } from 'react';

import Toast from 'react-native-toast-message';

import IPv4Address from '../ipAddress/IPv4Address';
import { loadCart, updateCart } from '../redux/CartReducer';
import { useDispatch } from 'react-redux';


export const AuthContext = createContext();

export default function Login({ navigation }) {
    const ip = IPv4Address();
  
   const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const saveData = () => {
        //saving username to session storage
        sessionStorage.setItem("id", user.id);

        setIsSaved(true);
        setTimeout(() => {
            setIsSaved(false);
        }, 2000);
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    

    

    const handleLogin = () => {
        const url = `http://${ip}:3000/user`;
        fetch(url)
            .then((response) => response.json())
            .then((users) => {
                const foundUser = users.find(
                    (user) => user.email === username && user.password === password
                );
                if (foundUser) {
                    setUserInfo(foundUser)
                    setLoggedIn(true);
                    Toast.show({
                        type: 'success',
                        text1: 'Đăng nhập thành công!',
                    });
                    console.log('Login Successful', foundUser);
                    sessionStorage.setItem("id", foundUser.id);                    
                                        
                    navigation.push('Account', { username: foundUser.email })
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Email và password chưa chính xác!',
                    });
                }
            })
            .catch((error) => {
                console.log('Error:', error);

                Toast.show({
                    type: 'failed',
                    text1: 'Email và password chưa chính xác!',
                });
            });

    };

    const dispatch = useDispatch();

    const userId = sessionStorage.getItem("id");
    const [cartUpdate, setCartUpdate] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://${ip}:3000/carts/${userId}`);
                const data = await response.json();
                setCartUpdate(data.productList);
                dispatch(loadCart(data.productList));
            } catch (error) {
                console.error(error);
                Alert.alert('An error occurred. Please try again.');
            }
        };
    
        fetchData(); // Call the async function immediately
    
    }, [dispatch, ip, userId]);
    


    return (
        <PaperProvider>
            <View style={
                {
                    backgroundColor: '#fff'
                }
            }>
                <View style={styles.container}>
                    <View style={{
                        height: 80
                    }}>
                        <Image style={styles.img} source={'https://hasaki.vn/images/graphics/img_login_fb_2.jpg'} />

                    </View>
                    <View style={
                        {
                            height: 50
                        }
                    }>
                        <Image style={styles.img} source={'https://hasaki.vn/images/graphics/img_login_gg_2.jpg'} />

                    </View>
                </View>

                <View style={styles.center}>
                    <Text>Hoặc tài khoản Hasaki.vn</Text>

                    <View style={{
                        marginTop: 100,
                        width: 380,
                        gap: 15,
                        display: 'flex',

                    }}>
                        <TextInput value={username}
                            onChangeText={setUsername} placeholderTextColor="gray" placeholder='Email'></TextInput>
                        <Divider />
                        <TextInput placeholderTextColor="gray" placeholder='Password' value={password}
                            onChangeText={setPassword}
                            secureTextEntry></TextInput>
                        <Divider />
                        <View style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end'
                        }}>
                            <Text style={{
                                display: 'flex',
                                color: '#0d5c37',
                                fontWeight: 600,
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                                width: 120

                            }}>Forgot password?</Text>

                        </View>

                    </View>
                    <View style={{
                        display: 'flex',
                        gap: 20
                    }}>
                        <Pressable style={{
                            width: 380,
                            height: 50,
                            backgroundColor: '#0d5c37'
                        }} onPress={handleLogin}>
                            <Text style={{
                                color: 'white',
                                textAlign: 'center',
                                marginTop: 15
                            }}>LOGIN</Text>
                        </Pressable>

                        <Pressable style={{
                            width: 380,
                            height: 50,
                            border: '1px solid #0d5c37'
                        }} onPress={() => {
                            navigation.push('Signup')
                        }}>
                            <Text style={{
                                color: '#0d5c37',
                                textAlign: 'center',
                                marginTop: 15
                            }}>SIGNUP</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </PaperProvider>
    )

};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
    },
    center: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#FFF',
        flexDirection: 'column',
        gap: 10,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    img: {
        height: 45,
        width: 200,
    },

}
)