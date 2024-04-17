import React, { createContext, useEffect, useState, ReactNode } from "react";
import { Dimensions, ScaledSize } from "react-native";

// I am not using the useWindowsDimension hook from react native for compatibility issues
interface DimensionsProviderProps {
  children: ReactNode;
  baseWidth?: number;
  baseHeight?: number;
}

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
}: DimensionsProviderProps) => {
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get("window"),
    screen: Dimensions.get("screen"),
    baseWidth,
    baseHeight,
  });

  useEffect(() => {
    const onChange = ({
      window,
      screen,
    }: {
      window: ScaledSize;
      screen: ScaledSize;
    }) => {
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
