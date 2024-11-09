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
      d="M17 10h3c0 1.86-1.28 3.41-3 3.86V15h3c0 1.86-1.28 3.41-3 3.86V20c0 .55-.45 1-1 1H8c-.55 0-1-.45-1-1v-1.14c-1.72-.45-3-2-3-3.86h3v-1.14c-1.72-.45-3-2-3-3.86h3V8.86c-1.72-.45-3-2-3-3.86h3V4c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v1h3c0 1.86-1.28 3.41-3 3.86V10Zm-7 7a2 2 0 1 0 3.999.001A2 2 0 0 0 10 17Zm2-3a2 2 0 1 1-.001-3.999A2 2 0 0 1 12 14Zm-2-7a2 2 0 1 0 2-2c-1.11 0-2 .89-2 2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
