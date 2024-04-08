type CalculatePercentageOfDiagonalParams = {
  deviceHeight: number;
  deviceWidth: number;
  percentage: number;
};

export const calculatePercentageOfDiagonal = ({
  deviceHeight,
  deviceWidth,
  percentage,
}: CalculatePercentageOfDiagonalParams) => {
  const dimension = Math.min(deviceHeight, deviceWidth);
  const aspectRatio = deviceHeight / deviceWidth;
  const aspectRatioBasedHeight = aspectRatio * dimension;
  const diagonal = Math.sqrt(
    Math.pow(aspectRatioBasedHeight, 2) + Math.pow(dimension, 2)
  );
  return (diagonal * percentage) / 100;
};
