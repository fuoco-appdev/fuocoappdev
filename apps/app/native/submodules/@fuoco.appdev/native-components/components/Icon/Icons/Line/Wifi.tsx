import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m1 8.776 2 2c4.97-4.97 13.03-4.97 18 0l2-2c-6.07-6.07-15.92-6.07-22 0Zm8 8 3 3 3-3a4.237 4.237 0 0 0-6 0Zm-4-4 2 2a7.074 7.074 0 0 1 10 0l2-2c-3.86-3.86-10.13-3.86-14 0Z" />
  </Svg>
)

export default Icon
