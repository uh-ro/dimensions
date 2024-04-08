import { Dimensions } from "react-native";
import { calculatePercentageOfDiagonal } from "./utils/dimensionsUtils";

const defaultDimensions = {
  window: Dimensions.get("window"),
  screen: Dimensions.get("screen"),
  baseWidth: 393,
  baseHeight: 852,
};

type RwParams = {
  inputBaseWidth?: number;
  dimensionType?: "window" | "screen";
};

type RhParams = {
  inputBaseHeight?: number;
  dimensionType?: "window" | "screen";
};

type RaParams = {
  inputBaseWidth?: number;
  inputBaseHeight?: number;
  dimensionType?: "window" | "screen";
};

export const createDimensionFunctions = (dimensions = defaultDimensions) => {
  const { window, screen, baseWidth, baseHeight } = dimensions;

  /**
   * Calculates a percentage of the viewport's width.
   * @param {number} percentage - The percentage of the viewport's width.
   * @param {string} dimensionType - The type of dimension to use ("window" or "screen").
   * @returns {number} - The calculated value.
   */
  const viewportWidth = (
    percentage: number,
    dimensionType: string = "window"
  ): number => {
    const chosenDimension = dimensionType === "screen" ? screen : window;

    return (chosenDimension.width * percentage) / 100;
  };

  /**
   * Calculates a percentage of the viewport's height.
   * @param {number} percentage - The percentage of the viewport's height.
   * @param {string} dimensionType - The type of dimension to use ("window" or "screen").
   * @returns {number} - The calculated value.
   */
  const viewportHeight = (
    percentage: number,
    dimensionType: string = "window"
  ): number => {
    const chosenDimension = dimensionType === "screen" ? screen : window;

    return (chosenDimension.height * percentage) / 100;
  };

  /**
   * Calculates a percentage of the screen's width.
   * @param {number} percentage - The percentage of the screen's width.
   * @returns {number} - The calculated value.
   */
  const screenWidth = (percentage: number): number => {
    return viewportWidth(percentage, "screen");
  };

  /**
   * Calculates a value as a percentage of the screen's diagonal length.
   * @param {number} percentage - The percentage of the diagonal length.
   * @param {string} dimensionType - The type of dimension to use ("window" or "screen").
   * @returns {number} - The calculated value.
   */
  const diagonalPercentage = (
    percentage: number,
    dimensionType: string = "window"
  ): number => {
    const chosenDimension = dimensionType === "screen" ? screen : window;
    return calculatePercentageOfDiagonal({
      deviceHeight: chosenDimension.height,
      deviceWidth: chosenDimension.width,
      percentage,
    });
  };

  /**
   * Calculates a percentage of the screen's height.
   * @param {number} percentage - The percentage of the screen's height.
   * @returns {number} - The calculated value.
   */
  const screenHeight = (percentage: number): number => {
    return viewportHeight(percentage, "screen");
  };

  /**
   * Scales a value based on the ratio of the window/screen width to a base width.
   * @param {number} value - The value to be scaled.
   * @param {RwParams} options - Configuration options for scaling.
   * @param {number} [options.inputBaseWidth=baseWidth] - The base width used for scaling reference.
   * @param {'window' | 'screen'} [options.dimensionType='window'] - Specifies whether to use window or screen dimensions for scaling.
   * @returns {number} - The scaled value, adjusted for the device's dimensions.
   */
  const responsiveWidth = (
    value: number,
    { inputBaseWidth = baseWidth, dimensionType = "window" }: RwParams = {}
  ): number => {
    const chosenDimension = dimensionType === "screen" ? screen : window;
    return (chosenDimension.width / inputBaseWidth) * value;
  };

  /**
   * Scales a value based on the ratio of the window/screen height to a base height.
   * @param {number} value - The value to be scaled.
   * @param {RhParams} options - Configuration options for scaling.
   * @param {number} [options.inputBaseHeight=baseHeight] - The base height used for scaling reference.
   * @param {'window' | 'screen'} [options.dimensionType='window'] - Specifies whether to use window or screen dimensions for scaling.
   * @returns {number} - The scaled value.
   */
  const responsiveHeight = (
    value: number,
    { inputBaseHeight = baseHeight, dimensionType = "window" }: RhParams = {}
  ): number => {
    const chosenDimension = dimensionType === "screen" ? screen : window;
    return (chosenDimension.height / inputBaseHeight) * value;
  };

  /**
   * Scales a value based on the window dimension ratio and base dimension ratio.
   * @param {number} value - The value to be scaled.
   * @param {RaParams} options - Configuration options for scaling.
   * @param {number} [options.inputBaseWidth=baseWidth] - The base width used for scaling reference.
   * @param {number} [options.inputBaseHeight=baseHeight] - The base height used for scaling reference.
   * @param {'window' | 'screen'} [options.dimensionType='window'] - Specifies whether to use window or screen dimensions for scaling.
   * @returns {number} - The scaled value.
   */
  const responsiveAspectRatio = (
    value: number,
    {
      inputBaseWidth = baseWidth,
      inputBaseHeight = baseHeight,
      dimensionType = "window",
    }: RaParams = {}
  ): number => {
    const chosenDimension = dimensionType === "screen" ? screen : window;
    const deviceRatio = chosenDimension.width / chosenDimension.height;
    const baseDimensionRatio = inputBaseWidth / inputBaseHeight;
    return baseDimensionRatio > deviceRatio
      ? responsiveWidth(value, {
          inputBaseWidth,
          dimensionType,
        })
      : responsiveHeight(value, {
          inputBaseHeight,
          dimensionType,
        });
  };

  return {
    window,
    screen,
    vw: viewportWidth,
    vh: viewportHeight,
    sw: screenWidth,
    sh: screenHeight,
    dg: diagonalPercentage,
    rw: responsiveWidth,
    rh: responsiveHeight,
    ra: responsiveAspectRatio,
  };
};
