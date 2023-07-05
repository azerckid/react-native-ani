import React, { useRef, useState } from "react";
import { Animated, Easing, Pressable, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;
const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const [up, setUp] = useState(false);
  const POSITION = useRef(new Animated.ValueXY({ x: 0, y: 300 })).current;
  const toggleUp = () => setUp((prev) => !prev);
  const moveUp = () => {
    Animated.timing(POSITION, {
      toValue: up ? 300 : -300,
      useNativeDriver: false,
      duration: 3000,
    }).start(toggleUp);
  };
  const opacity = POSITION.y.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [1, 0.5, 1],
  });
  const borderRadius = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });
  const rotate = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["-360deg", "360deg"],
  });
  const bgColor = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255, 99, 71)", "rgb(99, 71, 255)"],
  });

  POSITION.addListener(() => {
    console.log("Y VALUE:", POSITION);
    console.log("opacity VALUE:", opacity);
    console.log("borderRadius VALUE:", borderRadius);
    console.log("rotate VALUE:", rotate);
  });
  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            borderRadius,
            opacity,
            backgroundColor: bgColor,
            transform: [{ translateY: POSITION.y }, { rotate }],
          }}
        />
      </Pressable>
    </Container>
  );
}
