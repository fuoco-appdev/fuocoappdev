import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 0H5a2.5 2.5 0 0 0-2.5 2.5v19A2.5 2.5 0 0 0 5 24h14a2.5 2.5 0 0 0 2.5-2.5v-19A2.5 2.5 0 0 0 19 0Zm-7 23c-.83 0-1.5-.67-1.5-1.5S11.17 20 12 20s1.5.67 1.5 1.5S12.83 23 12 23Zm7.5-4h-15V3h15v16Z" />
  </Svg>
)

export default Icon
