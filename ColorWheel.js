import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  View,
  Image,
} from 'react-native';

import ColorWheelImage from './images/colorwheel.png';

const ColorWheel = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [colorDegree, setColorDegree] = useState(90);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        const y = parseInt(pan.y._value * -1);
        const x = parseInt(pan.x._value);
        //console.log('y:', y, ' x:', x);

        let result = (Math.atan(x / y) * 180) / Math.PI; //degree

        if (x < 0) {
          result += 360;
        }

        if (y < 0) {
          result += 180;
        }

        console.log(result % 360);
        setColorDegree(result % 360)

        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Animated.Image
        source={ColorWheelImage}
        style={{width: '100%', height: '100%', position: 'absolute'}}
      />
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          width: 40,
          height: 40,
          backgroundColor: `hsl(${colorDegree}, 100%, 50%)`,
          borderRadius: 25,
          borderColor: '#ffffff',
          borderWidth: 2,
          position: 'absolute',
          left: Dimensions.get('screen').width / 2 - 20,
          top: Dimensions.get('screen').width / 2 - 20,
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width,
  },
});

export default ColorWheel;
