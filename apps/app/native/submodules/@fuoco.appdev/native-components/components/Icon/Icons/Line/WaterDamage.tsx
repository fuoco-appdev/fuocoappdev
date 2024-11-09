import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m12 3.5-10 9h3v8h14v-8h3l-10-9Zm-5 15v-7.81l5-4.5 5 4.5v7.81H7Zm7-4c0 1.1-.9 2-2 2s-2-.9-2-2 2-4 2-4 2 2.9 2 4Z" />
  </Svg>
)

export default Icon
