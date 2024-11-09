import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m11.87 12.43-1-3.43h-1.5l1.75 6h1.5l1.75-6h-1.5l-1 3.43ZM21 11.5v-1c0-.85-.65-1.5-1.5-1.5H16v6h1.5v-2h1.15l.85 2H21l-.9-2.1c.5-.25.9-.8.9-1.4Zm-1.5 0h-2v-1h2v1ZM6.5 9H3v6h3.5c.85 0 1.5-.65 1.5-1.5v-3C8 9.65 7.35 9 6.5 9Zm0 4.5h-2v-3h2v3Z" />
  </Svg>
)

export default Icon
