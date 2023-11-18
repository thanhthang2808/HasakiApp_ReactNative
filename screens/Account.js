import * as React from 'react';
import { Text, View, Image, TextInput, StyleSheet, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Login from './Login';


export default function Account({ navigation }) {
    return (
        <View>
            <Pressable onPress={() => navigation.navigate('Login')}>
                <Text>Log in</Text>
            </Pressable>

        </View>

    )
}
