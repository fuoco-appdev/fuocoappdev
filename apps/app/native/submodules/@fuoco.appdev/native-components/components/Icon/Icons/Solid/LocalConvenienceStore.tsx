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
      d="M19 7V4H5v3H2v13h8v-4h4v4h8V7h-3ZM9 10v1h2v1H8V9h2V8H8V7h3v3H9Zm6 2h1V7h-1v2h-1V7h-1v3h2v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
