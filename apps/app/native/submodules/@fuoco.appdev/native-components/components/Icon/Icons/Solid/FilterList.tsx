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
      d="M3 6v2h18V6H3Zm7 12h4v-2h-4v2Zm8-5H6v-2h12v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
