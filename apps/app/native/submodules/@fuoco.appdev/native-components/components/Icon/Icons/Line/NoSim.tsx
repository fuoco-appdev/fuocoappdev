import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M21.44 20.4 3.97 2.93 2.56 4.34 5.3 7.08l-.12.12v10.99c0 1.1.9 2 2 2h10c.35 0 .68-.1.97-.26l1.88 1.88 1.41-1.41ZM7.18 18.19V8.96l9.23 9.23H7.18Zm3.84-14h6.16v9.11l2 2V4.19c0-1.1-.9-2-2-2h-6.99L8.13 4.25l1.41 1.41 1.48-1.47Z" />
  </Svg>
)

export default Icon
