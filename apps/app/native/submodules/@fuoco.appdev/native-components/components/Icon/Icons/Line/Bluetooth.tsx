import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18.355 7.71 12.645 2h-1v7.59L7.055 5l-1.41 1.41 5.59 5.59-5.59 5.59L7.055 19l4.59-4.59V22h1l5.71-5.71-4.3-4.29 4.3-4.29Zm-4.71-1.88 1.88 1.88-1.88 1.88V5.83Zm1.88 10.46-1.88 1.88v-3.76l1.88 1.88Z" />
  </Svg>
)

export default Icon
