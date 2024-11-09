import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20 8.965a7.996 7.996 0 0 0-8-7.93c-4.4 0-7.96 3.54-8 7.93v6c0 4.42 3.58 8 8 8s8-3.58 8-8v-6Zm-2 0h-5v-5.84c2.81.47 4.96 2.9 5 5.84Zm-7-5.84v5.84H6a6.005 6.005 0 0 1 5-5.84Zm7 11.84c0 3.31-2.69 6-6 6s-6-2.69-6-6v-4h12v4Z" />
  </Svg>
)

export default Icon
