import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M14.5 8.83v6.34L12.33 13H9.5v-2h2.83l2.17-2.17Zm2-4.83-5 5h-4v6h4l5 5V4Z" />
  </Svg>
)

export default Icon
