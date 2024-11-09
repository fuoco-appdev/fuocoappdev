import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M16.5 3.5h-2c-1.1 0-2 .9-2 2v5c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2Zm0 7h-2v-5h2v5Zm-6.5 5h8.5v2H9.99c-.88 0-1.66-.58-1.92-1.43L5.5 7.5v-4h2v4l2.5 8Zm-1.5 3h10v2h-10v-2Z" />
  </Svg>
)

export default Icon
