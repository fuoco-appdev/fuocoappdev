import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18.5 2h-9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm0 14h-9V4h9v12Zm-15-1v-2h2v2h-2Zm0-5.5h2v2h-2v-2Zm7 10.5h2v2h-2v-2Zm-7-1.5v-2h2v2h-2Zm2 3.5c-1.1 0-2-.9-2-2h2v2ZM9 22H7v-2h2v2Zm5 0v-2h2c0 1.1-.9 2-2 2ZM5.5 6v2h-2c0-1.1.9-2 2-2Z" />
  </Svg>
)

export default Icon
