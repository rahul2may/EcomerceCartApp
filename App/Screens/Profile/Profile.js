import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { AppButton, Container, Text, useTheme } from 'react-native-basic-elements'
import { moderateScale } from '../../Constants/PixelRatio'
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/reducer/User'
import HomeHeader from '../../Components/Header/HomeHeader'

const Profile = () => {
    const color = useTheme()
    const dispatch = useDispatch();
    return (
        <Container style={{ ...styles.container, backgroundColor: color.backgroundColor }}>
            <HomeHeader />
            <ScrollView contentContainerStyle={{ ...styles.contentContainerStyle }}>

                <Text.Heading
                    title='This is Profile Page'
                    style={{
                        fontSize: moderateScale(18)
                    }}
                />
                <AppButton
                    title='Logout'
                    textStyle={{
                        color: '#fff',
                        fontWeight: '700'
                    }}
                    style={{
                        paddingHorizontal: moderateScale(15),
                        marginTop: moderateScale(10)
                    }}
                    onPress={() => dispatch(logout())}
                />
            </ScrollView>
        </Container>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainerStyle: {
        flexGrow: 1,
        paddingHorizontal: moderateScale(10),
        alignItems:"center",
        justifyContent:"center"
    },
})