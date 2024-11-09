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
      d="M4 4h16c1.11 0 2 .89 2 2v12c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2l.01-12c0-1.11.88-2 1.99-2Zm3.3 11h1.2V9H7.25v3.5L4.75 9H3.5v6h1.25v-3.5L7.3 15Zm6.2-4.74H11v1.12h2.5v1.26H11v1.11h2.5V15h-4V9h4v1.26Zm6 4.74c.55 0 1-.45 1-1V9h-1.25v4.5h-1.12V9.99h-1.25v3.52h-1.13V9H14.5v5c0 .55.45 1 1 1h4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
