import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M14.77 9 12 12.11 9.23 9h5.54ZM21 3H3v2l8 9v5H6v2h12v-2h-5v-5l8-9V3ZM7.43 7 5.66 5h12.69l-1.78 2H7.43Z" />
  </Svg>
)

export default Icon
