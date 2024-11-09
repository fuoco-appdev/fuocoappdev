import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M13.5 8c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4Zm-2 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2Z" />
    <Path d="M1.5 18v2h16v-2c0-2.66-5.33-4-8-4s-8 1.34-8 4Zm2 0c.2-.71 3.3-2 6-2 2.69 0 5.77 1.28 6 2h-12Z" />
    <Path d="M22.5 10h-6v2h6v-2Z" />
  </Svg>
)

export default Icon
