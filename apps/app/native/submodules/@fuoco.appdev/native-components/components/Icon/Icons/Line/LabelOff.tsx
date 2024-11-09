import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m16 7.19 3.55 5-1.63 2.29 1.43 1.43L22 12.19l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-7.37.01 2 1.99H16ZM2 4.22 3.58 5.8c-.36.35-.58.85-.58 1.39v10c0 1.1.9 1.99 2 1.99l11 .01c.28 0 .55-.07.79-.18l2.18 2.18 1.41-1.41L3.41 2.81 2 4.22Zm12.97 12.97H5V7.22l9.97 9.97Z" />
  </Svg>
)

export default Icon
