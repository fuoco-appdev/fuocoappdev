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
      d="M4 18h5V5H4v13Zm6 0h5V5h-5v13Zm6 0V5h5v13h-5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
