import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M20 2c1.1 0 1.99.9 1.99 2L22 22l-4-4H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h16ZM6 14h12v-2H6v2Zm12-3H6V9h12v2ZM6 8h12V6H6v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
