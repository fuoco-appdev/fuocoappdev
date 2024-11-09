import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M5 20v2h5v2l3-3-3-3v2H5Zm9 0h5v2h-5v-2ZM11.99 8C13.1 8 14 7.1 14 6s-.9-2-2.01-2C10.88 4 10 4.9 10 6s.89 2 1.99 2ZM17 0H7C5.9 0 5 .9 5 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2Zm0 16H7v-2h10v2Zm0-3.5c0-1.67-3.33-2.5-5-2.5s-5 .83-5 2.5V2h10v10.5Z" />
  </Svg>
)

export default Icon
