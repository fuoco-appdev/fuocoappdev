import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M5.004 15h14V9h-14v6Zm2-4h10v2h-10v-2Z" />
    <Path d="M13.004 2h-2v3h2V2Z" />
    <Path d="M19.08 4.596 17.29 6.4l1.42 1.41 1.79-1.803-1.42-1.41Z" />
    <Path d="M13.004 19h-2v3h2v-3Z" />
    <Path d="m17.294 17.71 1.79 1.8 1.42-1.42-1.8-1.79-1.41 1.41Z" />
    <Path d="M4.906 4.602 3.499 6.009 5.288 7.8l1.407-1.41-1.79-1.789Z" />
    <Path d="m5.298 16.287-1.802 1.79 1.41 1.418 1.802-1.79-1.41-1.418Z" />
  </Svg>
)

export default Icon
