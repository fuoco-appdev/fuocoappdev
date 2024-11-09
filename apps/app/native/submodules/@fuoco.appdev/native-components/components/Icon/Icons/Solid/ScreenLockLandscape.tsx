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
      d="M3 5h18c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2Zm2 12h14V7H5v10Zm9-1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1v-1a2 2 0 1 0-4 0v1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h4Zm-2-7.2c-.66 0-1.2.54-1.2 1.2v1h2.4v-1c0-.66-.54-1.2-1.2-1.2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
