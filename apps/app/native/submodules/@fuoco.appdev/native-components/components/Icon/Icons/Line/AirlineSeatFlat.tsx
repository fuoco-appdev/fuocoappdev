import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M5 12.5a3 3 0 0 0 2.1-5.14C6.51 6.79 5.75 6.5 5 6.5a3 3 0 0 0-2.1 5.14c.59.57 1.35.86 2.1.86Zm-.71-3.7a1 1 0 0 1 1.41-.02c.4.39.4 1.01.02 1.41-.2.2-.45.31-.72.31-.26 0-.51-.1-.7-.28-.4-.4-.4-1.02-.01-1.42ZM18 6.5H9v6h13v-2c0-2.21-1.79-4-4-4Zm-7 4v-2h7c1.1 0 2 .9 2 2h-9Zm-9 5h6v2h8v-2h6v-2H2v2Z" />
  </Svg>
)

export default Icon
