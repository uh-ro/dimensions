import React, { createContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";

// I am not using the useWindowsDimension hook from react native for compatibility issues

export const DimensionsContext = createContext({
  window: Dimensions.get("window"),
  screen: Dimensions.get("screen"),
  baseWidth: 393,
  baseHeight: 852,
});

export const DimensionsProvider = ({
  children,
  baseWidth = 393,
  baseHeight = 852,
}) => {
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get("window"),
    screen: Dimensions.get("screen"),
    baseWidth,
    baseHeight,
  });

  useEffect(() => {
    const onChange = ({ window, screen }) => {
      setDimensions({
        window,
        screen,
        baseWidth,
        baseHeight,
      });
    };

    const subscription = Dimensions.addEventListener("change", onChange);
    return () => {
      subscription?.remove();
    };
  }, [baseWidth, baseHeight]);

  return (
    <DimensionsContext.Provider value={dimensions}>
      {children}
    </DimensionsContext.Provider>
  );
};
