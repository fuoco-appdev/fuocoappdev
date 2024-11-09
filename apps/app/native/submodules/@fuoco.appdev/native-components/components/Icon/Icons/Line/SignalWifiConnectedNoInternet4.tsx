import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M24 8.48A16.88 16.88 0 0 0 12 3.5c-4.69 0-8.93 1.9-12 4.98L12 20.5v-9h8.99L24 8.48Zm-4.41 5.02-2.09 2.09-2.09-2.09L14 14.91 16.09 17 14 19.09l1.41 1.41 2.09-2.08 2.09 2.08L21 19.09 18.92 17 21 14.91l-1.41-1.41Z" />
  </Svg>
)

export default Icon
