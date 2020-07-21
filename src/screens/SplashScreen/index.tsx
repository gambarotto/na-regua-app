import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

import { colors } from '../../utils/styles';

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerLottie}>
        <LottieView
          source={require('../../assets/lottie/loading.json')}
          autoPlay
          loop
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
  },
  containerLottie: {
    height: 100,
    width: 100,
  },
});
export default SplashScreen;
