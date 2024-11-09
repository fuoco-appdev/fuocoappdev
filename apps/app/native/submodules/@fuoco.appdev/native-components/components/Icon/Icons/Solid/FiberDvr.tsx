import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M21 3H3c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V5c0-1.11-.89-2-2-2ZM6.5 10.5h-2v3h2v-3Zm13 0h-2v1h2v-1ZM6.5 15c.85 0 1.5-.65 1.5-1.5v-3C8 9.65 7.35 9 6.5 9H3v6h3.5Zm4.62 0L9.37 9h1.5l1 3.43 1-3.43h1.5l-1.75 6h-1.5Zm8.98-2.1c.5-.25.9-.8.9-1.4v-1c0-.85-.65-1.5-1.5-1.5H16v6h1.5v-2h1.15l.85 2H21l-.9-2.1Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
