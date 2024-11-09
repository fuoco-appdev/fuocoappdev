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
      d="M21.05 6.3c.57.35.94.98.94 1.7L22 18c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V8c0-.72.38-1.35.95-1.7L12 1l9.05 5.3ZM3.74 7.84 12 13l8.26-5.16L12 3 3.74 7.84Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
