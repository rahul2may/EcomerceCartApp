import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { Card, Container, Text, useTheme } from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';
import HomeHeader from '../../Components/Header/HomeHeader';
import { FONTS } from '../../Constants/Fonts';
import { useDispatch, useSelector } from 'react-redux';
import { setCartContentUpdate, setDeleteCartItem, setQuantityUpdate } from '../../Redux/reducer/Cart';

const Home = () => {
    const color = useTheme();
    const dispatch = useDispatch();
    const { initialCart } = useSelector(state => state.Cart);

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://fakestoreapi.com/products');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const json = await response.json();
            setData(json);
        } catch (error) {
            setError(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = (item) => {
        dispatch(setQuantityUpdate(item));
        dispatch(setCartContentUpdate(item));
    };

    const removeQuantity = (item) => {
        dispatch(setDeleteCartItem(item));
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData();
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    if (error) {
        return (
            <Container style={{ ...styles.container, backgroundColor: color.backgroundColor }}>
                <HomeHeader />
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            </Container>
        );
    }

    return (
        <Container style={{ ...styles.container, backgroundColor: color.backgroundColor }}>
            <HomeHeader />
            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#007BFF" />
                </View>
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    {data.map(item => {
                        return (
                            <Card key={item.id} style={styles.card}>
                                <Image style={styles.imageStyle} source={{ uri: item.image }} />
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.description}>{item.description}</Text>
                                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                                <View style={styles.counterContainer}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => removeQuantity(item)}
                                    >
                                        <Text style={{ ...styles.counterText, color: color.primaryFontColor }}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.counterValue}>{initialCart.filter((data)=> data.id === item.id).length}</Text>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => updateQuantity(item)}
                                    >
                                        <Text style={{ ...styles.counterText, color: color.primaryFontColor }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </Card>
                        );
                    })}
                </ScrollView>
            )}
        </Container>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: moderateScale(16),
        color: 'red',
    },
    contentContainerStyle: {
        paddingHorizontal: moderateScale(15),
        paddingVertical: moderateScale(10),
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
        overflow: 'hidden',
    },
    imageStyle: {
        width: '100%',
        height: moderateScale(180),
        borderRadius: 8,
        marginBottom: moderateScale(10),
    },
    title: {
        fontSize: moderateScale(16),
        fontWeight: '600',
        color: '#333',
        marginBottom: moderateScale(8),
    },
    description: {
        fontSize: moderateScale(14),
        color: '#666',
        marginBottom: moderateScale(10),
    },
    price: {
        fontSize: moderateScale(16),
        fontWeight: '700',
        color: '#007BFF',
        marginBottom: moderateScale(10),
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '70%',
        alignSelf: 'center',
    },
    button: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    counterText: {
        fontSize: moderateScale(25),
        fontFamily: FONTS.Poppins.regular,
        color: '#000',
    },
    counterValue: {
        fontSize: moderateScale(18),
        fontWeight: '600',
        color: '#333',
        marginHorizontal: moderateScale(10),
    },
});

