import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12.01 5.5 10 8h4l-1.99-2.5ZM18 10v4l2.5-1.99L18 10ZM6 10l-2.5 2.01L6 14v-4Zm8 6h-4l2.01 2.5L14 16Zm7-13H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm0 16.01H3V4.99h18v14.02Z" />
  </Svg>
)

export default Icon
