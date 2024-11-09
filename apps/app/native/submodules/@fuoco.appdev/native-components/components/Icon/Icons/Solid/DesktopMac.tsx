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
      d="M3 2h18c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2h-7l2 3v1H8v-1l2-3H3c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2Zm0 12h18V4H3v10Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
