# @uh-ro/dimensions

[![npm version](https://badge.fury.io/js/%40uh-ro%2Fdimensions.svg)](https://badge.fury.io/js/%40uh-ro%2Fdimensions)

@uh-ro/dimensions is a utility package that streamlines the process of creating responsive designs in React Native applications. It is inspired by viewport units - (`vh` and `vw`) in CSS, and simplifies the process of
scaling dimensions and fonts based on a base dimension.

## Key Features

- **Viewport-like Units**:
  The package introduces methods `vh` and `vw` that behave like their CSS counterparts, offering enhanced layout flexibility in React Native.

- **Font Scaling**: It enables font scaling using `rw` (Responsive Width) or `dg` (Diagonal Percentage), ensuring consistent typography across different screen sizes.

- **Unit Scaling**: It provides methods `rh` (Responsive Height) and `rw` that scale a value based on the base dimension, allowing developers to maintain consistent proportions across various screen sizes.

With @uh-ro/dimensions, developers can effortlessly achieve responsive and adaptive user interfaces in React Native applications, without worrying about device dimensions or intricate calculation processes.

## Installation

### npm

```bash
npm install @uh-ro/dimensions
```

### yarn

```bash
yarn add @uh-ro/dimensions
```

## Usage

### Importing the Utilities

#### For Static Dimensions

```javascript
import {
  window,
  screen,
  vw,
  vh,
  sw,
  sh,
  dg,
  rw,
  rh,
  ra,
} from "@uh-ro/dimensions";
```

#### For Dynamic Dimensions (Provider and Hook)

To utilize dynamic dimensions, wrap your application root with the `DimensionsProvider` and access dimensions using the `useDimensions` hook.

##### DimensionsProvider Props

- `baseWidth`: The base width of your application (default: 393).
- `baseHeight`: The base height of your application (default: 852).

```javascript
import { DimensionsProvider } from "@uh-ro/dimensions";

// Wrap your application root with DimensionsProvider
function App() {
  return (
    <DimensionsProvider baseWidth={393} baseHeight={852}>
      <MyApp />
    </DimensionsProvider>
  );
}
```

```javascript
import { useDimensions } from "@uh-ro/dimensions";
import { View } from "react-native";

// Use in your component
function MyComponent() {
  const { window, screen, vw, vh, sw, sh, dg, rw, rh, ra } = useDimensions();

  return (
    <View style={{ width: vw(50), height: vh(50) }}>
      {/* Your component content here */}
    </View>
  );
}
```

`window` and `screen` are directly from the Dimensions module in React Native, obtained using `Dimension.get("window")` and `Dimension.get("screen")` methods.

### Dimension Methods

- #### vw (viewportWidth)

Returns a calculated width value as a percentage of the window or screen's width.

```javascript
vw(percentage: number, dimensionType: "window" | "screen" = 'window'): number
```

- #### vh (viewportHeight)

Returns a calculated height value as a percentage of the window or screen's height.

```javascript
vh(percentage: number, dimensionType: "window" | "screen" = 'window'): number
```

- #### sw (screenWidth)

Returns a calculated width value as a percentage of the screen's width.

```javascript
sw(percentage: number): number
```

- #### sh (screenHeight)

Returns a calculated height value as a percentage of the screen's height.

```javascript
sh(percentage: number): number
```

- #### dg (diagonalPercentage)

Returns a calculated value as a percentage of the screen's diagonal.

```javascript
dg(percentage: number, dimensionType: "window" | "screen" = 'window'): number
```

- #### rw (responsiveWidth)

Scales a value based on the window or screen's width and the base width.

```javascript
rw(value: number, { inputBaseWidth = baseWidth, dimensionType = "window" }: RwParams): number
```

- #### rh (responsiveHeight)

Scales a value based on the window or screen's height and the base height.

```javascript
rh(value: number, { inputBaseHeight = baseHeight, dimensionType = "window" }: RhParams): number
```

- #### ra (responsiveAspectRatio)

Scales a value based on the window dimension ratio and base dimension ratio. It dynamically adjusts the size value to maintain consistent proportions across different screen sizes by comparing it to a base width and height.

```javascript
ra(value: number, { inputBaseWidth = baseWidth, inputBaseHeight = baseHeight, dimensionType = "window" }: RaParams): number
```

### Method Props

- `inputBaseWidth`: Specifies the base width used for calculations. Defaults to the `baseWidth` prop from the `DimensionsProvider` if used with the hook, otherwise defaults to 393.

- `inputBaseHeight`: Specifies the base height used for calculations. Defaults to the `baseHeight` prop from the `DimensionsProvider` if used with the hook, otherwise defaults to 852.

- `dimensionType`: Specifies whether to use window or screen dimensions for the calculation. Accepted values are `"window"` or `"screen"`. If not provided, `"window"` is used by default.

  The `dimensionType` parameter allows you to specify whether to use window or screen dimensions for the calculation. Here's what each value means:

  - `"window"`: Uses the dimensions of the application's window.

  - `"screen"`: Uses the dimensions of the device's screen.

## Note: Usage for Fonts

The `rw` function can be used to handle font sizes dynamically. For instance, calling `rw(20)` will calculate a font size value that is scaled based on the ratio of the smaller dimension of the window/screen to the `inputBaseWidth`.

The `dg` function returns a percentage of the screen's diagonal. For example, passing `dg(2.11)` would return a calculated value representing 2.11 percent of the screen's diagonal. This can be useful for dynamically adjusting font sizes.

## Examples

You can try out live [examples](https://snack.expo.dev/@valentineifeanyi/react-native-uh-ro-_dimensions-example) on Expo Snack:

## Contributing

Contributions are welcome! Fork the repository and submit a pull request to contribute.

## License

This package is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
