import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M22 7h-9v2h9V7Z" />
    <Path d="M22 15h-9v2h9v-2Z" />
    <Path d="M22 11h-6v2h6v-2Z" />
    <Path d="M13 12 8 7v4H2v2h6v4l5-5Z" />
  </Svg>
)

export default Icon
