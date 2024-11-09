import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 3H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5a2 2 0 0 0-2-2Zm0 16H5V5h14v14Zm-9.5-4H11v-1.49h1V12h-1V9H9.5v3H8V9H6.5v4.5h3V15Zm8.7 0-2-3 2-3h-1.7l-2 3 2 3h1.7Zm-3.7-3V9H13v6h1.5v-3Z" />
  </Svg>
)

export default Icon
