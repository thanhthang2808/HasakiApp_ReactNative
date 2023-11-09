import * as React from 'react';
import { Text, View, Image, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Category from './screens/Category';

function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function Cart() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Cart!</Text>
    </View>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}

function Account() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Account</Text>
    </View>
  );
}

function LogoTitle() {
  return (
    <Image
      style={{ width: 40, height: 40 }}
      source={require('./assets/logo.png')}
    />
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#306E51',
        headerStyle: {
          backgroundColor: '#306E51', 
        },
        headerTitle: (props) => (
          <LogoTitle {...props} />
        ),
        headerTitleStyle: { flex: 1 },
        headerTitleAlign: 'left',
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginRight: 15}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "#FFF", borderRadius: 20, marginRight: 10, marginLeft: 10, paddingVertical: 8, paddingHorizontal: 10, width: "60%", height: "70%" }}>
              <MaterialCommunityIcons name="magnify" color="gray" size={18} />
              <TextInput
                placeholder="Tìm kiếm"
                placeholderTextColor="gray"
                style={{ flex: 1, height: 25, fontSize: 11, marginLeft: 5, width: "80%" }}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10}}> 
              <MaterialCommunityIcons name="barcode-scan" color="#fff" size={25} style={{marginRight: 15}} />
              <MaterialCommunityIcons name="map-marker" color="#fff" size={25} style={{marginRight: 15}} />
              <MaterialCommunityIcons name="package-variant-closed" color="#fff" size={25} />
            </View> 
          </View>                   
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          tabBarLabel: 'Danh mục',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='format-list-bulleted-type' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: 'Giỏ hàng',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='cart' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
