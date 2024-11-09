import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M7 11H5v7h2v-7Zm6 0h-2v7h2v-7Zm8.5 9h-19v2h19v-2ZM19 11h-2v7h2v-7Zm-7-6.74L17.21 7H6.79L12 4.26ZM12 2 2.5 7v2h19V7L12 2Z" />
  </Svg>
)

export default Icon
