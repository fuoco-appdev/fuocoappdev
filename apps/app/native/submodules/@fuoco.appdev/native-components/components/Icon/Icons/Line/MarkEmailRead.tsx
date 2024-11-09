import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19.5 3h-16c-1.1 0-1.99.9-1.99 2L1.5 17c0 1.1.9 2 2 2h8v-2h-8V7l8 5 8-5v5h2V5c0-1.1-.9-2-2-2Zm-8 7-8-5h16l-8 5Zm5.34 11-3.54-3.54 1.41-1.41 2.12 2.12 4.24-4.24 1.43 1.41L16.84 21Z" />
  </Svg>
)

export default Icon
