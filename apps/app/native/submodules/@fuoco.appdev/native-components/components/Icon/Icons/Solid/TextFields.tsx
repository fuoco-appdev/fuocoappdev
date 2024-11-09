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
      d="M2.5 7V4h13v3h-5v12h-3V7h-5Zm10 2h9v3h-3v7h-3v-7h-3V9Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
