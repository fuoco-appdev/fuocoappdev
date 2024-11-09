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
      d="M5 2h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2h-4l-3 3-3-3H5c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2Zm7 15 1.88-4.12L18 11l-4.12-1.88L12 5l-1.88 4.12L6 11l4.12 1.88L12 17Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
