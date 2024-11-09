import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m22 5.79-4.6-3.86-1.29 1.53 4.6 3.86L22 5.79ZM7.88 3.46 6.6 1.93 2 5.78l1.29 1.53 4.59-3.85Zm4.62 4.61H11v6l4.75 2.85.75-1.23-4-2.37V8.07Zm-.5-4a9 9 0 0 0-9 9c0 4.97 4.02 9 9 9a9 9 0 0 0 0-18Zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7Z" />
  </Svg>
)

export default Icon
