import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M13.62 3a9 9 0 0 0-9 9c0 .06.01.12.01.19l-1.84-1.84-1.41 1.41L5.62 16l4.24-4.24-1.41-1.41-1.82 1.82c0-.06-.01-.11-.01-.17 0-3.86 3.14-7 7-7s7 3.14 7 7-3.14 7-7 7c-1.9 0-3.62-.76-4.88-1.99l-1.42 1.41a8.982 8.982 0 0 0 6.3 2.58 9 9 0 0 0 0-18Zm2 8v-1c0-1.1-.9-2-2-2s-2 .9-2 2v1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1Zm-1 0h-2v-1c0-.55.45-1 1-1s1 .45 1 1v1Z" />
  </Svg>
)

export default Icon
