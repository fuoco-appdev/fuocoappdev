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
      d="M11 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-4 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm12.6.6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
