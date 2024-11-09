import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 10c-1.1 0-2 .9-2 2h-1V3L3 8v13h18v-9c0-1.1-.9-2-2-2ZM5 9.37l9-3.46V12H9v7H5V9.37ZM19 19h-3v-3h-2v3h-3v-5h8v5Z" />
  </Svg>
)

export default Icon
