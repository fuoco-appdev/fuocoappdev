import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M5 15.78c0 3.87 3.13 7 7 7s7-3.13 7-7v-4H5v4ZM16.12 4.15l2.1-2.1-.82-.83-2.3 2.31c-.94-.47-1.98-.75-3.1-.75s-2.16.28-3.09.75L6.6 1.22l-.82.83 2.1 2.1C6.14 5.42 5 7.46 5 9.78v1h14v-1c0-2.32-1.14-4.36-2.88-5.63ZM9 8.78c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Z" />
  </Svg>
)

export default Icon
