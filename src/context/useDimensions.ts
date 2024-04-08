import { useContext } from "react";
import { createDimensionFunctions } from "../createDimensionFunctions";
import { DimensionsContext } from "./DimensionsContext";

const useDimensions = () => {
  const dimensions = useContext(DimensionsContext);

  if (!dimensions) {
    throw new Error(
      "useDimensions must be used within a DimensionsProvider. Make sure you've wrapped your component with the provider."
    );
  }

  return createDimensionFunctions(dimensions);
};

export default useDimensions;
