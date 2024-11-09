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
      d="M14 3h-4v12h4V3Zm0 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
