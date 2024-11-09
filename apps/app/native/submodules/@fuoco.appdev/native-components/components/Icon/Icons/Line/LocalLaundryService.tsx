import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18 2.01 6 2c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h12c1.11 0 2-.89 2-2V4c0-1.11-.89-1.99-2-1.99ZM18 20H6L5.99 4H18v16Z" />
    <Path d="M8 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    <Path d="M11 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    <Path d="M12 19c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5Zm2.36-7.36c1.3 1.3 1.3 3.42 0 4.72-1.3 1.3-3.42 1.3-4.72 0l4.72-4.72Z" />
  </Svg>
)

export default Icon
