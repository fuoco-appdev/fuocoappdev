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
      d="M7 9V7h14v2H7Zm-2 4h14v-2H5v2Zm-2 4h14v-2H3v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
