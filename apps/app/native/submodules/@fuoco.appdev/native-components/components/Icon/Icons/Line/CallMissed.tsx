import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19.59 6.795 12 14.385l-5.59-5.59H11v-2H3v8h2v-4.59l7 7 9-9-1.41-1.41Z" />
  </Svg>
)

export default Icon
