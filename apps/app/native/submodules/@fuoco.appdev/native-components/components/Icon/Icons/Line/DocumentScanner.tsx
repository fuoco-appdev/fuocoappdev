import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M7 3H4v3H2V1h5v2Zm15 3V1h-5v2h3v3h2ZM7 21H4v-3H2v5h5v-2Zm13-3v3h-3v2h5v-5h-2ZM17 6H7v12h10V6Zm2 12c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v12ZM15 8H9v2h6V8Zm0 3H9v2h6v-2Zm0 3H9v2h6v-2Z" />
  </Svg>
)

export default Icon
