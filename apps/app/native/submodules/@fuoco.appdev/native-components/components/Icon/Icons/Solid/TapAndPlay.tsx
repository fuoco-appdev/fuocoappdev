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
      d="m7 1 10 .01c1.1 0 2 .89 2 1.99v17c0 1.1-.9 2-2 2h-2.08c-.11-1.41-.43-2.75-.95-4H17V5H7v6.01c-.64-.27-1.31-.48-2-.64V3c0-1.1.9-2 2-2ZM2 12v2a9 9 0 0 1 9 9h2c0-6.08-4.92-11-11-11Zm0 6v-2c3.87 0 7 3.13 7 7H7c0-2.76-2.24-5-5-5Zm0 5v-3c1.66 0 3 1.34 3 3H2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
