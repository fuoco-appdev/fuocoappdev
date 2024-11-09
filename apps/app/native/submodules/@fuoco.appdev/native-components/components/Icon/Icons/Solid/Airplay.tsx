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
      d="M3 3h18c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2h-4v-2h4V5H3v12h4v2H3c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2Zm9 13 6 6H6l6-6Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
