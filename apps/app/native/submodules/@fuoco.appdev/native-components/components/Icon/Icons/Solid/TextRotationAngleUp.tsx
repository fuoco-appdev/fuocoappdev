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
      d="m8.48 12.75 3.54-3.54 2.19.92 1.48-1.48L4.56 4.23 3.5 5.29l4.42 11.14 1.48-1.48-.92-2.2ZM16.76 9l1.41 1.41-9.19 9.19 1.41 1.41 9.19-9.19L21 13.24V9h-4.24ZM5.43 6.16l2.23 4.87 2.64-2.64-4.87-2.23Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
