import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18.595 10.04C17.933 6.59 15.024 4 11.53 4 8.755 4 6.346 5.64 5.146 8.04 2.256 8.36.01 10.91.01 14c0 3.31 2.582 6 5.76 6h12.48c2.65 0 4.8-2.24 4.8-5 0-2.64-1.968-4.78-4.455-4.96Z" />
  </Svg>
)

export default Icon
