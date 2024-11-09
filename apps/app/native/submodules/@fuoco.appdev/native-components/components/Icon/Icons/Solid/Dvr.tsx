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
      d="M3 3h18c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2h-5v2H8v-2H3c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2Zm0 14h18V5H3v12Zm16-9H8v2h11V8ZM8 12h11v2H8v-2ZM7 8H5v2h2V8Zm-2 4h2v2H5v-2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
