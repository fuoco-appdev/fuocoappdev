import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m3.51 6.03 7.51 3.22-7.52-1 .01-2.22Zm7.5 8.72L3.5 17.97v-2.22l7.51-1ZM1.51 3l-.01 7 15 2-15 2 .01 7 20.99-9L1.51 3Z" />
  </Svg>
)

export default Icon
