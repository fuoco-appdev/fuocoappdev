import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M13 8c0-2.21-1.79-4-4-4S5 5.79 5 8s1.79 4 4 4 4-1.79 4-4Zm-2 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2ZM1 18v2h16v-2c0-2.66-5.33-4-8-4s-8 1.34-8 4Zm2 0c.2-.71 3.3-2 6-2 2.69 0 5.78 1.28 6 2H3Zm17-3v-3h3v-2h-3V7h-2v3h-3v2h3v3h2Z" />
  </Svg>
)

export default Icon
