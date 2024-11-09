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
      d="M5 6V4h14v2H5Zm4 8H5l7-7 7 7h-4v6H9v-6Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
