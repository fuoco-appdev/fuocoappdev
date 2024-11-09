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
      d="M17 7v3.5l4-4v11l-4-4V17c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h12c.55 0 1 .45 1 1Zm-6 6h3v-2h-3V8H9v3H6v2h3v3h2v-3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
