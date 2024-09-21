# Auto Image

⚡ Image with enhanced feature like auto scale image, loading, and more ⚡

## Description

AutoImage is a React Native component that automatically scales images to fit the screen while maintaining their aspect ratio. It also provides a loading indicator and error handling.

## Installation

To install Auto Image, run the following command:

```bash
npm install @rn-flix/auto-image
```

## Usage

To use Auto Image, import the component and pass the image source as a prop:

```jsx
import AutoImage from '@rn-flix/auto-image';

const App = () => {
  return <AutoImage source="https://picsum.photos/400/200" width={300} />;
};
```

## Props

The following props are available:

- `source`: The image source either require or url directly (required)
- `width`: The width of the image (optional)
- `height`: The height of the image (optional)
- `style`: Custom styles for the image (optional)
- `loadingWidth`: Set the width of the loading indicator (optional)
- `loadingHeight`: Set the height of the loading indicator (optional)

## Example

Here is an example of using Auto Image with a remote image:

```jsx
import AutoImage from '@rn-flix/auto-image';

const App = () => {
  return (
    <AutoImage
      source="https://picsum.photos/400/200"
      width={300}
      style={{ borderRadius: 10 }}
    />
  );
};
```

## License

Auto Image is licensed under the MIT License.

## Author

Auto Image was created by [Flix](https://github.com/flixyudh).

## Bugs and Issues

If you encounter any bugs or issues, please report them on the [issue tracker](https://github.com/flixyudh/rn-flix/issues).
