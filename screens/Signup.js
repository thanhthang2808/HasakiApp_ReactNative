import React, { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { Divider, PaperProvider } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [checked, setChecked] = React.useState(true);

    const addUser = () => {
        fetch("http://localhost:3000/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log("User added:", responseData);
                // Perform any additional actions after adding the user
            })
            .catch((error) => {
                console.error("Error adding user:", error);
            });
    };

    return (
        <PaperProvider>


            <View style={{
                display: 'flex',
                gap: '15px',
                padding: '15px'
            }}>
                <TextInput
                    placeholder="Name"
                    placeholderTextColor="gray"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    mode="outlined"
                />
                <Divider />
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="gray"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    mode="outlined"
                />
                <Divider />
                <TextInput
                    placeholder="Phone"
                    placeholderTextColor="gray"
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    mode="outlined"
                />
                <Divider />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="gray"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    mode="outlined"
                />
                <Divider />

                <View style={{
                    flexDirection: 'row'
                }}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                        color="#306E51"

                    />
                    <Text>Tôi đã đọc và đồng ý với Điều kiện giao dịch chung và
                        {'\n'}  Chính sách bảo mật thông tin của Hasaki</Text>

                </View>


                <View style={{
                    display: 'flex',
                    gap: '20px'
                }}>
                    <Pressable style={{
                        width: '380px',
                        height: '50px',
                        backgroundColor: '#0d5c37'
                    }} onPress={addUser}>
                        <Text style={{
                            color: 'white',
                            textAlign: 'center',
                            marginTop: '15px'
                        }}>SIGNUP</Text>
                    </Pressable>

                    <Pressable style={{
                        width: '380px',
                        height: '50px',
                        border: '1px solid #0d5c37'
                    }} onPress={() => {
                        navigation.push('Login')
                    }}>
                        <Text style={{
                            color: '#0d5c37',
                            textAlign: 'center',
                            marginTop: '15px'
                        }}>LOGIN</Text>
                    </Pressable>
                </View>
            </View>
        </PaperProvider>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        gap: '10px',
        justifyContent: 'center',
    },
    textInput: {




    }
}
)