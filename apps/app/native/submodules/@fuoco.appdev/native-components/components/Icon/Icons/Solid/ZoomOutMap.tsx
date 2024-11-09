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
      d="M5.3 6.7 3 9V3h6L6.7 5.3l2.89 2.87-1.42 1.42L5.3 6.7Zm12-1.4L15 3h6v6l-2.3-2.3-2.87 2.89-1.42-1.42L17.3 5.3ZM9 21l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6h6Zm9.7-3.7L21 15v6h-6l2.3-2.3-2.89-2.87 1.42-1.42 2.87 2.89Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
