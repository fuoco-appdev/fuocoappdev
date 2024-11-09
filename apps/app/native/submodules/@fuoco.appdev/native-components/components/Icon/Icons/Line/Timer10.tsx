import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M0 7.789v1.65l2.998-.982v9.435h1.998V6.098h-.25L0 7.788Zm23.76 6.535c-.14-.275-.35-.52-.63-.727a3.717 3.717 0 0 0-1.008-.52c-.4-.138-.85-.266-1.35-.374a6.71 6.71 0 0 1-.869-.226 2.625 2.625 0 0 1-.55-.246.709.709 0 0 1-.279-.295.947.947 0 0 1 .01-.786.875.875 0 0 1 .27-.334c.12-.099.27-.177.45-.236.18-.06.4-.089.639-.089.25 0 .47.04.66.109.19.068.35.167.479.284.13.118.22.256.29.413.06.157.1.315.1.482h1.948c0-.383-.08-.737-.24-1.071-.16-.335-.39-.62-.69-.865a3.434 3.434 0 0 0-1.088-.58c-.43-.148-.92-.216-1.459-.216-.51 0-.98.068-1.389.206a3.37 3.37 0 0 0-1.059.56 2.53 2.53 0 0 0-.67.826 2.13 2.13 0 0 0-.23.992c0 .354.08.679.23.944.15.275.36.511.64.717.27.207.6.374.98.521.379.138.808.256 1.268.354.39.079.71.167.95.256.24.088.429.186.569.285.13.098.22.216.27.334.05.118.07.245.07.383 0 .315-.13.56-.4.757-.27.196-.66.285-1.17.285-.219 0-.429-.02-.639-.079a1.68 1.68 0 0 1-.56-.236 1.32 1.32 0 0 1-.409-.432 1.344 1.344 0 0 1-.18-.659h-1.888c0 .354.08.698.24 1.032.16.334.39.64.7.914.309.266.689.482 1.148.649.46.167.98.246 1.579.246.53 0 1.01-.06 1.439-.187.43-.128.8-.305 1.109-.53.31-.227.54-.502.71-.816.17-.315.249-.659.249-1.042-.02-.393-.09-.727-.24-1.003ZM13.808 7.13a2.974 2.974 0 0 0-1.229-.865A4.52 4.52 0 0 0 10.991 6a4.56 4.56 0 0 0-1.589.265 2.88 2.88 0 0 0-1.229.865c-.34.403-.6.914-.79 1.563-.179.639-.279 1.425-.279 2.349v1.887c0 .924.09 1.71.28 2.349.19.648.45 1.17.8 1.572.339.403.749.698 1.228.875a4.56 4.56 0 0 0 1.589.275c.59 0 1.119-.088 1.588-.275.48-.177.88-.472 1.22-.875.34-.403.599-.924.779-1.572.18-.64.28-1.425.28-2.35v-1.886c0-.924-.09-1.71-.28-2.35-.18-.648-.44-1.169-.78-1.562Zm-.919 6.064c0 .59-.04 1.091-.12 1.504-.08.413-.2.747-.36 1.002a1.51 1.51 0 0 1-.589.56c-.23.118-.51.177-.82.177-.299 0-.579-.059-.819-.177a1.474 1.474 0 0 1-.599-.56c-.16-.255-.29-.59-.38-1.002-.09-.413-.13-.914-.13-1.504v-2.457c0-.59.04-1.09.13-1.494.09-.403.21-.727.38-.983.16-.245.36-.422.6-.54.24-.108.51-.167.809-.167.31 0 .58.059.81.167.239.108.439.285.599.54.16.246.29.57.37.973.08.403.13.905.13 1.494v2.467h-.01Z" />
  </Svg>
)

export default Icon