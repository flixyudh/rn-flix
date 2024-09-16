import { ActivityIndicator, View } from 'react-native';

/**
 * @file RenderWithLoading.js
 * @brief This component renders a loading indicator or a placeholder component when the `isLoading` prop is true,
 * and the `children` when it's false.
 *
 * @typedef {Object} RenderWithLoadingProps
 * @prop {React.ReactNode} children - The children components.
 * @prop {boolean} isLoading - Whether to show the loading indicator or not.
 * @prop {number} width - The width of the loading indicator or placeholder component.
 * @prop {number} height - The height of the loading indicator or placeholder component.
 * @prop {React.ComponentType} renderLoading - The loading indicator component to render.
 * @prop {import('react-native').ViewProps} style - The style object for the component.
 *
 * @returns {JSX.Element} The rendered component.
 */
const RenderWithLoading = ({
  children,
  isLoading,
  width,
  height,
  renderLoading,
  style,
}) => {
  if (isLoading) {
    return (
      <View
        style={[
          {
            width,
            height,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ccc',
          },
          style,
        ]}
      >
        <LoadingIndicator renderLoading={renderLoading} />
      </View>
    );
  } else return children;
};

const LoadingIndicator = ({ renderLoading }) => {
  if (renderLoading) return renderLoading;
  else return <ActivityIndicator size={'large'} color="orangered" />;
};

export default RenderWithLoading;
