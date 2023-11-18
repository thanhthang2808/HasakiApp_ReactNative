
import * as React from 'react';
import { Text, View, Image, TextInput, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import Category from './screens/Category';
import Homepage from './screens/Homepage';
import { Provider } from 'react-redux';
import store from './redux/store';
import Cart from './screens/Cart';
import Account from './screens/Account';
import Login from './screens/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetail from './screens/ProductDetail';
import Signup from './screens/Signup';
import SearchEngine from './screens/SearchEngine';

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
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
const Stack = createStackNavigator();

function MyTabs() {
  const navigation = useNavigation();
  const [searchKeyword, setSearchKeyword] = React.useState();
  return (
    <Tab.Navigator
      initialRouteName="Homepage"
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
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginRight: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "#FFF", borderRadius: 20, marginRight: 10, marginLeft: 10, paddingVertical: 8, paddingHorizontal: 10, width: "60%", height: "70%" }}>
              <MaterialCommunityIcons name="magnify" color="gray" size={18} />
              <TextInput
                placeholder="Tìm kiếm"
                placeholderTextColor="gray"
                value={searchKeyword}
                onSubmitEditing={() => navigation.navigate('SearchEngine', { keyword: searchKeyword })}
                onChangeText={text => setSearchKeyword(text)}
                style={{ flex: 1, height: 25, fontSize: 11, marginLeft: 5, width: "80%" }}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
              <MaterialCommunityIcons name="barcode-scan" color="#fff" size={25} style={{ marginRight: 15 }} />
              <MaterialCommunityIcons name="map-marker" color="#fff" size={25} style={{ marginRight: 15 }} />
              <MaterialCommunityIcons name="package-variant-closed" color="#fff" size={25} />
            </View>
          </View>
        ),
      }}
    >
      <Tab.Screen
        name="HomepageStack"
        component={HomepageStack}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CategoryStack"
        component={CategoryStack}
        options={{
          tabBarLabel: 'Danh mục',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='format-list-bulleted-type' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CartStack"
        component={CartStack}
        options={{
          tabBarLabel: 'Giỏ hàng',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='cart' color={color} size={size} />
          ),
          headerShown: false,
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
        component={AccountStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }} />
    </Tab.Navigator>
  );
}

const HomepageStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Homepage" component={Homepage} options={{ headerShown: false }} />
      <Stack.Screen name="SearchEngine" component={SearchEngine} options={{ headerShown: false }}/>
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
};


const CategoryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Category" component={Category} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
};



const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{   }} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};
    

const CartStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#306E51', 
      },
      headerTitleStyle: { color: '#FFF' },
      headerTitleAlign: 'center',
    }}
    >
      <Stack.Screen name="Giỏ hàng" component={Cart} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />

    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyTabs />

      </NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </Provider>
  );
}