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
      d="M16.83 5H20c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2h-7v-2.09c2.83-.48 5-2.94 5-5.91h-2c0 2.21-1.79 4-4 4s-4-1.79-4-4H6c0 2.97 2.17 5.43 5 5.91V21H4c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h3.17l1.79-2h6l1.87 2ZM12 15c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2s-2 .9-2 2v4c0 1.1.9 2 2 2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
