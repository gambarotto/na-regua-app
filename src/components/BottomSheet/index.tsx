import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  Dimensions,
  StyleSheet,
  Animated,
  PanResponder,
} from 'react-native';

import ScheduleBottomModal from '../../screens/MainScreen/ScheduleBottomModal';

const BottomSheet: React.FC = ({ isVisible, setIsVisible }) => {
  const [panY, setPanY] = useState<Animated.Value>(
    new Animated.Value(Dimensions.get('screen').height)
  );
  const [resetPosition, setResetPosition] = useState(
    Animated.timing(panY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    })
  );
  const [closeAnim, setCloseAnim] = useState(
    Animated.timing(panY, {
      toValue: Dimensions.get('screen').height,
      duration: 500,
      useNativeDriver: true,
    })
  );

  useEffect(() => {
    if (isVisible) {
      resetPosition.start();
    }
  }, [resetPosition, isVisible]);

  const top = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });
  const _handleDismiss = () => {
    closeAnim.start();
  };
  const _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => false,
    onPanResponderMove: Animated.event([null, { dy: panY }]),
    onPanResponderRelease: (e, gs) => {
      if (gs.dy > 0 && gs.vy > 2) {
        return closeAnim.start();
      }
      return resetPosition.start();
    },
  });
  return (
    <Modal
      animated
      animationType="fade"
      visible={isVisible}
      transparent
      onRequestClose={() => setIsVisible(false)}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.container, { top }]}>
          <Text>oi</Text>
        </Animated.View>
      </View>
      {/* <ScheduleBottomModal /> */}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
  },
});
export default BottomSheet;
