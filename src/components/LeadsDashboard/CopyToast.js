import React, { useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native"
import { deviceWidth } from '../../utils/stylesheet'
import { colors } from '../../utils/styleGuide'

const fadeDuration = 50;
const bottomPosition = 20;

export const CopyToast = (props) => {
  const { toastCount, setToastCount, hideToast } = props
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1]
  })

  const fadeIn = React.useCallback(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: fadeDuration,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  const fadeOut = React.useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: fadeDuration,
      useNativeDriver: true,
    }).start(() => {
      hideToast && hideToast();
    });
  }, [opacity]);

  React.useEffect(() => {
    if (toastCount === 0) {
      return;
    }

    let timer
    if (toastCount !== 1) {
      opacity.stopAnimation()
      Animated.timing(opacity, {
        toValue: 0,
        duration: fadeDuration,
        useNativeDriver: true,
      }).start(() => {
        setToastCount(1)
      })
    } else {
      fadeIn();
      timer = setTimeout(fadeOut, 1000)
    }

    return () => clearTimeout(timer);
  }, [toastCount, fadeIn, fadeOut]);

  if (toastCount === 0) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          bottom: bottomPosition,
          opacity: opacity,
          transform: [{ scale: scale }]
        },
      ]}
    >
      <View style={[
        styles.toast,
      ]}>
        <Text style={styles.message}>Copied</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    position: "absolute",
    zIndex: 9999999999,
  },
  toast: {
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#000000cc',
    width: deviceWidth - 36
  },
  message: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '700'
  },
});
