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
      d="M15 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9ZM6.01 5.68A6.99 6.99 0 0 0 2 12c0 2.79 1.64 5.2 4.01 6.32v2.16C2.52 19.24 0 15.91 0 12s2.52-7.24 6.01-8.48v2.16ZM16 8v3h3v2h-3v3h-2v-3h-3v-2h3V8h2Zm-8 4c0 3.86 3.14 7 7 7s7-3.14 7-7-3.14-7-7-7-7 3.14-7 7Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
