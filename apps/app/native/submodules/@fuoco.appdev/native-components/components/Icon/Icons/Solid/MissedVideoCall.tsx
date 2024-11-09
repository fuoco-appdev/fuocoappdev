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
      d="M17 7v3.5l4-4v11l-4-4V17c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h12c.55 0 1 .45 1 1ZM6.11 11.11 10 15l5-5-.78-.79L10 13.43l-3.11-3.1h2.55V9.22H5v4.44h1.11v-2.55Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
