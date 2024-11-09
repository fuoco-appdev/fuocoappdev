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
      d="M12 4a7.49 7.49 0 0 1 7.35 6.04c2.6.18 4.65 2.32 4.65 4.96 0 2.76-2.24 5-5 5H6c-3.31 0-6-2.69-6-6 0-3.1 2.35-5.64 5.36-5.96A7.48 7.48 0 0 1 12 4ZM6 18h13c1.65 0 3-1.35 3-3s-1.35-3-3-3h-1.5v-.5C17.5 8.47 15.03 6 12 6c-1.8 0-3.39.88-4.4 2.22 2.54.7 4.4 3.02 4.4 5.78h-2c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
