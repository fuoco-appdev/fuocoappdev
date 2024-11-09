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
      d="M11.99 2C6.47 2 2 6.47 2 12s4.47 10 9.99 10C17.51 22 22 17.53 22 12S17.52 2 11.99 2ZM8.88 9.94 9.94 11 11 9.94 8.88 7.82 6.76 9.94 7.82 11l1.06-1.06ZM12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5Zm2.06-6.5L13 9.94l2.12-2.12 2.12 2.12L16.18 11l-1.06-1.06L14.06 11ZM4 12c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8-8 3.58-8 8Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
