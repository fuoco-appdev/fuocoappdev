import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M21 1H3c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2ZM5.41 4l5.18 5.17-1.41 1.42L4 5.42 5.41 4ZM20 20h-6v-2h2.61l-3.2-3.2 1.42-1.42L18 16.55V14h2v6Zm0-10h-2V7.42L5.41 20 4 18.59 16.58 6H14V4h6v6Z" />
  </Svg>
)

export default Icon
