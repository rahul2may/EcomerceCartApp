// SplashScreen.js
import React, {useEffect} from 'react';
import NavigationService from '../../Services/Navigation';
import {Image, StyleSheet, View} from 'react-native';
import {COLORS} from '../../Constants/Colors';
import {moderateScale} from '../../Constants/PixelRatio';

const Splash = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      NavigationService.navigate('SignIn');
    }, 3000);
    return () => clearTimeout(timer);
  }, [NavigationService]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../Assets/buy-now.png')}
        style={styles.logo}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryWhiteColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: moderateScale(200),
    height: moderateScale(200),
    resizeMode: 'contain',
  },
});
