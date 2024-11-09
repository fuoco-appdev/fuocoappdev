import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M6.5 17a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    <Path d="M15.5 17a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    <Path d="M18 18H4v-5h11v-2H4.81l1.04-3H15V6H5.5c-.66 0-1.21.42-1.42 1.01L2 13v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8h-2v5Z" />
    <Path d="M22 4.85 19.15 2h-.5v3.79l-2.3-2.29-.7.7L18.44 7l-2.79 2.79.7.71 2.3-2.3V12h.5L22 9.14 19.85 7 22 4.85Zm-2.35-.94.94.94-.94.94V3.91Zm.94 5.23-.94.94V8.2l.94.94Z" />
  </Svg>
)

export default Icon
