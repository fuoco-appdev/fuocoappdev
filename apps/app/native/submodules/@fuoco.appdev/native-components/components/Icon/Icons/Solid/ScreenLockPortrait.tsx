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
      d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2Zm-2 14c0 .55-.45 1-1 1h-4c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1v-1a2 2 0 1 1 4 0v1c.55 0 1 .45 1 1v3Zm-3-6.2c-.66 0-1.2.54-1.2 1.2v1h2.4v-1c0-.66-.54-1.2-1.2-1.2ZM7 19h10V5H7v14Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
