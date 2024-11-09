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
      d="M5.33 15 12 5l6.67 10H5.33ZM19 19v-2H5v2h14Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
