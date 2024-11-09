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
      d="M17 4h3v16h-3V4ZM5 14h3v6H5v-6Zm9-5h-3v11h3V9Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
