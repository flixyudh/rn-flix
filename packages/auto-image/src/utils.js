import { Image } from 'react-native';

/**
 * Calculate the size of the given image source.
 *
 * @param {string|ImageRequireSource} source - The source of the image. Can be a URL or an imported image.
 * @param {ImageRequireSource} [defaultErrorImage] - The default image to use if the source is not a valid image.
 *
 * @returns {Promise<ImageResizeMode>} A promise that resolves with the size of the image.
 *
 * @example
 * import { CalculateImageSize } from '@rn-flix/auto-image';
 *
 * CalculateImageSize('https://example.com/image.jpg').then((size) => {
 *   console.log(size);
 * });
 */
export const CalculateImageSize = (source, defaultErrorImage) => {
  return new Promise((resolve, reject) => {
    const isSourceURL = typeof source === 'string';
    if (isSourceURL) {
      Image.getSize(
        source,
        (width, height) => resolve({ width, height }),
        reject
      );
    } else {
      const detailSource = Image.resolveAssetSource(
        source || defaultErrorImage
      );
      resolve(detailSource);
    }
  });
};
