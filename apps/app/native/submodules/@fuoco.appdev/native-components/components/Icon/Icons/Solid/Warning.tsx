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
      d="M23 21 12 2 1 21h22Zm-12-3v-2h2v2h-2Zm0-4h2v-4h-2v4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
