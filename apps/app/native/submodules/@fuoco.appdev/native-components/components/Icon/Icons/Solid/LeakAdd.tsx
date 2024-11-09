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
      d="M3 3h3c0 1.66-1.34 3-3 3V3Zm9 0h2c0 6.07-4.92 11-11 11v-2a9 9 0 0 0 9-9Zm-2 0H8c0 2.76-2.24 5-5 5v2c3.87 0 7-3.13 7-7Zm2 18h-2c0-6.07 4.93-11 11-11v2a9 9 0 0 0-9 9Zm6 0h3v-3c-1.66 0-3 1.34-3 3Zm-2 0h-2c0-3.87 3.13-7 7-7v2c-2.76 0-5 2.24-5 5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
