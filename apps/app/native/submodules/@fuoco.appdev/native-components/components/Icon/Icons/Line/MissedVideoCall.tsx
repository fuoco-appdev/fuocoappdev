import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4ZM15 16H5V8h10v8Zm-7.89-4.89L11 15l3.77-3.79-.78-.79L11 13.43l-3.11-3.1h2.55V9.22H6v4.44h1.11v-2.55Z" />
  </Svg>
)

export default Icon
