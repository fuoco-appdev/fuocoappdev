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
      d="M5 21h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2Zm8-11.5h5v-2h-5v2Zm0 7h5v-2h-5v2ZM6 11h5V6H6v5Zm4-4H7v3h3V7ZM6 18h5v-5H6v5Zm4-4H7v3h3v-3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
