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
      d="M4 18h3V5H4v13ZM18 5v13h3V5h-3Zm-1 13H8V5h9v13Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
