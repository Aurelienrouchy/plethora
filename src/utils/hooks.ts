import { useEffect, useMemo, useRef } from "react";
import { Animated } from "react-native";
import { bin } from "./math";

export const useTiming = (
    state: boolean | number,
    config?: any
  ) => {
    const animation = useRef(new Animated.Value(0)).current;
    const value = typeof state === "boolean" ? bin(state) : state;

    useEffect(() => {
        Animated.timing(animation, { toValue: value, duration: 300, useNativeDriver: true }).start(() => {
            animation.setValue(value)
        })
    }, [state])
    
    return animation;
};