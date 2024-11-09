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
      d="M8 6H6v12h2V6Zm10 12-8.5-6L18 6v12Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
