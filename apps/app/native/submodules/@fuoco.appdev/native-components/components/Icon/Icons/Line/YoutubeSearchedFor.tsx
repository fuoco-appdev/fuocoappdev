import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17.01 14.26h-.8l-.27-.27a6.451 6.451 0 0 0 1.57-4.23 6.5 6.5 0 0 0-6.5-6.5c-3.59 0-6.5 3-6.5 6.5H2l3.84 4 4.16-4H6.51a4.5 4.5 0 0 1 9 0 4.507 4.507 0 0 1-6.32 4.12l-1.48 1.48a6.474 6.474 0 0 0 7.52-.67l.27.27v.79l5.01 4.99L22 19.26l-4.99-5Z" />
  </Svg>
)

export default Icon
