import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17.2 5v8.61l2 2V3c0-1.1-.9-2-2-2h-10c-.71 0-1.33.37-1.68.93L8.59 5h8.61ZM1.69 3.76 5.2 7.27V21c0 1.1.9 2 2 2h10c1.02 0 1.85-.77 1.98-1.75l1.72 1.72 1.41-1.41L3.1 2.35 1.69 3.76ZM7.2 9.27 16.93 19H7.2V9.27Z" />
  </Svg>
)

export default Icon
