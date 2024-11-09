import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M7 11H1v2h6v-2Zm2.17-3.24L7.05 5.64 5.64 7.05l2.12 2.12 1.41-1.41ZM13 1h-2v6h2V1Zm5.36 6.05-1.41-1.41-2.12 2.12 1.41 1.41 2.12-2.12ZM17 11v2h6v-2h-6Zm-5-2c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3Zm2.83 7.24 2.12 2.12 1.41-1.41-2.12-2.12-1.41 1.41Zm-9.19.71 1.41 1.41 2.12-2.12-1.41-1.41-2.12 2.12ZM11 23h2v-6h-2v6Z" />
  </Svg>
)

export default Icon
