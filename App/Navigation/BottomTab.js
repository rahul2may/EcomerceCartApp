import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import Home from '../Screens/Home/Home';
import Profile from '../Screens/Profile/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#009688',
                tabBarInactiveTintColor: '#808080',
                headerShown: false,
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{
                    tabBarIcon: () => (
                        <Image 
                            source={require('../Assets/home.png')}
                            style={{ width: 30, height: 30 }} 
                        />
                    ),
                }} 
            />
            <Tab.Screen 
                name="Profile" 
                component={Profile} 
                options={{
                    tabBarIcon: () => (
                        <Image 
                            source={require('../Assets/profile-user.png')} 
                            style={{ width: 30, height: 30 }} 
                        />
                    ),
                }} 
            />
        </Tab.Navigator>
    );
}

export default BottomTab;

const styles = StyleSheet.create({});
