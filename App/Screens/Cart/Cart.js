import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { Card, Container, Text, useTheme } from 'react-native-basic-elements';
import HomeHeader from '../../Components/Header/HomeHeader';
import { useDispatch, useSelector } from 'react-redux';
import { afterDeleteProductFromCart, CartDataUpdated, setCartContentUpdate, setDeleteCartItem, setQuantityUpdate } from '../../Redux/reducer/Cart';

const Cart = () => {
    const color = useTheme();
    const dispatch = useDispatch();
    const { initialCart } = useSelector(state => state.Cart);
    const { CartData } = useSelector(state => state.Cart);

    const handleIncrement = (id) => {

        dispatch(setQuantityUpdate(id));
        dispatch(setCartContentUpdate(id));
    };

    const handleDecrement = (id, count) => {
        if (count === 1){
            dispatch(CartDataUpdated(id));
            dispatch(afterDeleteProductFromCart(id?.id));
        }
        else {
       dispatch(setDeleteCartItem(id));
        }
    };

    const calculateTotal = () => {
        return initialCart.reduce(
            (total, product) => total + product.price,
            0
        );
    };

    return (
        <Container style={{ ...styles.container, backgroundColor: color.backgroundColor }}>
            {/* Header */}
            <HomeHeader />

            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                {CartData?.map((product) => (
                    <Card style={styles.card} key={product.id}>
                        <Image
                            style={styles.productImage}
                            source={{ uri: product.image }}
                        />
                        <View style={styles.productDetails}>
                            <Text style={styles.productName}>{product?.title}</Text>
                            <Text style={styles.productPrice}>Price: {product.price}</Text>
                            <Text style={styles.productTotalPrice}>
                                Total: {initialCart.filter((data) => data.id === product.id).length * product.price}
                            </Text>

                            {/* Quantity Control */}
                            <View style={styles.quantityControl}>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => handleDecrement(product, initialCart.filter((data) => data.id === product.id).length)}
                                >
                                    <Text style={styles.quantityButtonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{initialCart.filter((data) => data.id === product.id).length}</Text>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => handleIncrement(product)}
                                >
                                    <Text style={styles.quantityButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Card>
                ))}

                {/* Total Amount */}
                <Card style={styles.totalAmountCard}>
                    <Text style={styles.totalAmountText}>Total Amount: {calculateTotal().toFixed(2)}</Text>
                </Card>
            </ScrollView>
        </Container>
    );
};

export default Cart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: moderateScale(10),
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    headerText: {
        fontSize: moderateScale(18),
        fontWeight: 'bold',
    },
    cartIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cartCount: {
        fontSize: moderateScale(14),
        color: '#000',
        marginRight: moderateScale(5),
    },
    cartIcon: {
        width: moderateScale(24),
        height: moderateScale(24),
    },
    contentContainerStyle: {
        flexGrow: 1,
        padding: moderateScale(10),
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: moderateScale(15),
        marginBottom: moderateScale(15),
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    productImage: {
        width: moderateScale(80),
        height: moderateScale(80),
        borderRadius: 8,
        marginRight: moderateScale(10),
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontSize: moderateScale(16),
        fontWeight: 'bold',
        marginBottom: moderateScale(5),
    },
    productPrice: {
        fontSize: moderateScale(14),
        color: '#555',
    },
    productTotalPrice: {
        fontSize: moderateScale(14),
        color: '#555',
        marginBottom: moderateScale(10),
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        width: moderateScale(30),
        height: moderateScale(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#f0f0f0',
    },
    quantityButtonText: {
        fontSize: moderateScale(18),
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: moderateScale(16),
        marginHorizontal: moderateScale(10),
    },
    totalAmountCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: moderateScale(15),
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    totalAmountText: {
        fontSize: moderateScale(16),
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
