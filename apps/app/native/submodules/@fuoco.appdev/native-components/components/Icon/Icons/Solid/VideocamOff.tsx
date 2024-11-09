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
      d="m2 3.27 1.41-1.41 17.73 17.73L19.73 21l-3.18-3.18c-.16.1-.34.18-.55.18H4c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h.73L2 3.27ZM21 6.5v10.11L10.39 6H16c.55 0 1 .45 1 1v3.5l4-4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
