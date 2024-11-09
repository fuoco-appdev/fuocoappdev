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
      d="M15.5 4H19v2H5V4h3.5l1-1h5l1 1ZM8 21c-1.1 0-2-.9-2-2V7h12v12c0 1.1-.9 2-2 2H8Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
