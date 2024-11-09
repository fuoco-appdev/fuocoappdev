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
      d="M12.5 12 4 18V6l8.5 6Zm9 0L13 18V6l8.5 6Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
