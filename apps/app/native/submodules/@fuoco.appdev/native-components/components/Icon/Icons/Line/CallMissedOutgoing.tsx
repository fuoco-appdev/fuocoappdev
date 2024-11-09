import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m3 8.205 9 9 7-7v4.59h2v-8h-8v2h4.59L12 14.385l-7.59-7.59L3 8.205Z" />
  </Svg>
)

export default Icon
