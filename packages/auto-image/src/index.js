import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
// import ErrorImage from './errorImage.png';
const ErrorImage = require('./errorImage.png');
import RenderWithLoading from './RenderWithLoading';
import { CalculateImageSize } from './utils';

const window = Dimensions.get('window');

var defaultErrorImage = ErrorImage;

/**
 * @author [Flix](https://github.com/zxccvvv)
 *
 * @param {Object} props
 * @param {string|import('react-native').ImageRequireSource} props.source - source of the Image
 * @param {number} props.width - set `Width` of image
 * @param {number} props.height - set `Height` of image
 * @param {import('react-native').ViewProps} props.style - set `Height` of image
 * @param {boolean} props.loadingWidth - set width of loading component
 * @param {boolean} props.loadingHeight - set height of loading component
 */
const AutoImage = (props) => {
  const windowWidth = useWindowDimensions().width;
  const [width, setWidth] = useState(windowWidth);
  const [height, setHeight] = useState(props.height || 0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [source, setSource] = useState(props.source);

  const SetSize = (size) => {
    if (props.width && !props.height)
      setHeight(size.height * (props.width / size.width));
    else if (!props.width && props.height)
      setWidth(size.width * (props.height / size.height));
    else {
      setHeight(size.height * (window.width / size.width));
    }
    setIsLoading(false);
  };

  const InitImage = async () => {
    try {
      const res = await CalculateImageSize(source, defaultErrorImage);
      SetSize(res);
    } catch (error) {
      console.error('AutoImage Error: ', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   InitImage();
  // }, [source]);

  useEffect(() => {
    if (props.width && props.height) {
      throw new Error(
        'Cannot set width and height, you can only use one of them, and put the rest inside style props'
      );
    } else if (props.width && width !== props.width) {
      setWidth(props.width);
      InitImage();
    } else if (props.height && height !== props.height) {
      setHeight(props.height);
      InitImage();
    } else InitImage();
  }, []);

  useEffect(() => {
    if (isError) setSource(defaultErrorImage);
  }, [isError]);

  // useEffect(() => {
  //   if (tempPropsWidth !== props.width || tempPropsHeight !== height)
  //     InitImage();
  // }, [props.width, props.height]);

  if (props.children) {
    return (
      <RenderWithLoading
        isLoading={isLoading}
        width={props.loadingWidth || width}
        height={props.loadingHeight || height}
        {...props}
      >
        <ImageBackground
          source={typeof source === 'string' ? { uri: source } : source}
          style={[{ width, height }, props.style]}
          imageStyle={[{ width, height }, props.imageStyle]}
        >
          {props.children}
        </ImageBackground>
      </RenderWithLoading>
    );
  } else {
    return (
      <RenderWithLoading
        isLoading={isLoading}
        width={props.loadingWidth || width}
        height={props.loadingHeight || height}
        {...props}
      >
        <Image
          source={typeof source === 'string' ? { uri: source } : source}
          style={[{ width, height }, props.style]}
        />
      </RenderWithLoading>
    );
  }
};

AutoImage.setErrorImage = (image) => {
  defaultErrorImage = image;
};

export default AutoImage;
