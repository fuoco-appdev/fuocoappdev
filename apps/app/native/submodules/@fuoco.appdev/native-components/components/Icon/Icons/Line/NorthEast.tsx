import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M9.5 4.5v2h6.59L4.5 18.09l1.41 1.41L17.5 7.91v6.59h2v-10h-10Z" />
  </Svg>
)

export default Icon
