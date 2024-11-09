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
      d="m5 10.7 4.6 4.6L19 6l-2-2-7.4 7.4L7 8.8l-2 1.9ZM19 18H5v2h14v-2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
