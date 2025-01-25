import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import NavigationService from '../../Services/Navigation';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { useTheme } from 'react-native-basic-elements';
import { useSelector } from 'react-redux';

const HomeHeader = () => {
    const theme = useTheme();
    const { initialCart } = useSelector(state => state.Cart);
    return (
        <View style={styles.headerContainer}>
            {/* Logo and Title */}
            <TouchableOpacity style={styles.row} onPress={() => NavigationService.back()}>
                <Image
                    source={require('../../Assets/buy-now.png')}
                    style={styles.logoImage}
                />
                <Text style={[styles.title, { color: theme.primaryFontColor }]}>Ecomerce App</Text>
            </TouchableOpacity>

            {/* Cart Section */}
            <TouchableOpacity style={styles.row} onPress={() => NavigationService.navigate('Cart')}>
                <View style={styles.countView}>
                    <Text style={[styles.countText, { color: theme.primaryFontColor }]}>{initialCart.length}</Text>
                </View>
                <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/34/34627.png' }}
                    style={styles.cartImage}
                />
            </TouchableOpacity>
        </View>
    );
};

export default HomeHeader;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(10),
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoImage: {
        width: moderateScale(30),
        height: moderateScale(30),
        resizeMode: 'contain',
    },
    cartImage: {
        width: moderateScale(24),
        height: moderateScale(24),
    },
    title: {
        fontSize: moderateScale(15),
        fontFamily: FONTS.Poppins.bold,
        marginLeft: moderateScale(5),
    },
    countView: {
        borderRadius: moderateScale(20),
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        marginRight: moderateScale(5),
    },
    countText: {
        fontSize: moderateScale(15),
        fontFamily: FONTS.Poppins.medium,
        padding: moderateScale(5),
    },
});