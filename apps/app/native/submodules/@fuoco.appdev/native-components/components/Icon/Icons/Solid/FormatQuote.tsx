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
      d="M8 17H5l2-4H4V7h6v6l-2 4Zm10 0h-3l2-4h-3V7h6v6l-2 4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
