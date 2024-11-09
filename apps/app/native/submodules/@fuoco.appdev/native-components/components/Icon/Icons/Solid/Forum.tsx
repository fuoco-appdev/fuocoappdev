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
      d="M17 3v9c0 .55-.45 1-1 1H6l-4 4V3c0-.55.45-1 1-1h13c.55 0 1 .45 1 1Zm2 3h2c.55 0 1 .45 1 1v15l-4-4H7c-.55 0-1-.45-1-1v-2h13V6Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
