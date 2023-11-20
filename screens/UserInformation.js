import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { Divider, PaperProvider } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import IPv4Address from "../ipAddress/IPv4Address";
export default function UserInformation({ route, navigation }) {
    const { user } = route.params

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState(user?.password || "");
    const [phone, setPhone] = useState(user?.phone || "");

    const [id, setId] = useState(user.id);

    console.log(user)



    navigation = useNavigation();

    const update = (navigation) => {
        const ip = IPv4Address();
        fetch(`http://${ip}:3000/user/${user.id}`, {
            method: "PUT",
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
                Toast.show({
                    type: 'success',
                    text1: 'Cập nhật thông tin thành công!',
                });
                navigation.push('Login')

            })
            .catch((error) => {
                Toast.show({
                    type: 'error',
                    text1: 'Cập nhật thông tin không thành công!',
                });
            });
    };



    return (
        <View style={{
            display: 'flex',
            gap: 15,
            padding: 15
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 5,

            }}>
                <Text>Name</Text>
                <TextInput
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
            </View>

            <Divider />
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 5,

            }}>
                <Text>Email</Text>
                <TextInput
                    value={email}
                    editable={true}
                    onChangeText={(text) => setEmail(text)}

                />
            </View>
            <Divider />
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 5,

            }}>
                <Text>Phone</Text>
                <TextInput
                    value={phone}
                    editable={true}
                    onChangeText={(text) => setPhone(text)}

                />
            </View>
            <Divider />
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 5,

            }}>
                <Text>Password</Text>
                <TextInput
                    secureTextEntry
                    value={password}
                    editable={true}
                    onChangeText={(text) => setPassword(text)}

                />
            </View>

            <Pressable style={{
                width: 380,
                height: 50,
                border: '1  solid #0d5c37',
                backgroundColor: '#0d5c37'
            }} onPress={() => { update(navigation) }}>
                <Text style={{
                    color: 'white',
                    textAlign: 'center',
                    marginTop: 15
                }}>Cập nhật thông tin</Text>
            </Pressable>
        </View>
    )
}