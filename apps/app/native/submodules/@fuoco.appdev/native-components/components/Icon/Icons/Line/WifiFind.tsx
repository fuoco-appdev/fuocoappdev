import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 5.5c4.14 0 7.88 1.68 10.59 4.39L24 8.48A16.88 16.88 0 0 0 12 3.5c-4.69 0-8.93 1.9-12 4.98L12 20.5l1.41-1.42L2.93 8.58C5.45 6.66 8.59 5.5 12 5.5Z" />
    <Path d="M21 13.5c0-2.24-1.76-4-4-4s-4 1.76-4 4 1.76 4 4 4c.75 0 1.44-.21 2.03-.56l2.56 2.56L23 18.09l-2.56-2.56c.35-.59.56-1.28.56-2.03Zm-4 2c-1.12 0-2-.88-2-2s.88-2 2-2 2 .88 2 2-.88 2-2 2Z" />
  </Svg>
)

export default Icon
