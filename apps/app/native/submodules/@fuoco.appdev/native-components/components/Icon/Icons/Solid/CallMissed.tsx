import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19.59 7 12 14.59 6.41 9H11V7H3v8h2v-4.59l7 7 9-9L19.59 7Z" />
  </Svg>
)

export default Icon
