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
      d="M9 15v-5c-2.21 0-4-1.79-4-4s1.79-4 4-4h8v2h-2v11h-2V4h-2v11H9Zm8-1 4 4-4 4v-3H5v-2h12v-3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
