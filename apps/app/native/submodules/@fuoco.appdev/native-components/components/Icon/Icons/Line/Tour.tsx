import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20 4H6V2H4v20h2v-8h14l-2-5 2-5Zm-3.86 5.74.9 2.26H6V6h11.05l-.9 2.26-.3.74.29.74ZM13 9c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2Z" />
  </Svg>
)

export default Icon
