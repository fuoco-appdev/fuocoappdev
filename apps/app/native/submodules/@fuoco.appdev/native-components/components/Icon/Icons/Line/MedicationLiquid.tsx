import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M14.5 3h-12v2h12V3Z" />
    <Path d="M1.5 21h14V6h-14v15Zm3-9H7V9.5h3V12h2.5v3H10v2.5H7V15H4.5v-3Z" />
    <Path d="M19.5 6c-1.68 0-3 1.76-3 4 0 1.77.83 3.22 2 3.76V21h2v-7.24c1.17-.54 2-1.99 2-3.76 0-2.24-1.32-4-3-4Z" />
  </Svg>
)

export default Icon
