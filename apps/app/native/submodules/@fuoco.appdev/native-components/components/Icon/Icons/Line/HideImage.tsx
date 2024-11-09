import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19.71 4.29v11.17l2 2V4.29c0-1.1-.9-2-2-2H6.54l2 2h11.17Z" />
    <Path d="M3.52 2.1 2.1 3.51l1.61 1.61v13.17c0 1.1.9 2 2 2h13.17l1.61 1.61 1.41-1.41L3.52 2.1Zm2.19 16.19V7.12l7.07 7.07-.82 1.1-2.25-3-3 4h8.17l2 2H5.71Z" />
  </Svg>
)

export default Icon
