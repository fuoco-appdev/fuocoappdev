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
      d="M4 4h6L7.71 6.29l5.29 5.3V20h-2v-7.59l-4.71-4.7L4 10V4Zm12.29 2.29L14 4h6v6l-2.29-2.29-2.88 2.88-1.42-1.42 2.88-2.88Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
