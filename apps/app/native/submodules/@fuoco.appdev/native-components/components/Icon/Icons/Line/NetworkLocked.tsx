import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M22 16.5V16a2.5 2.5 0 0 0-5 0v.5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1Zm-1 0h-3V16c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v.5ZM18 6.33v5.43c.47-.16.97-.26 1.5-.26.17 0 .33.03.5.05V1.5l-19 19h13v-2H5.83L18 6.33Z" />
  </Svg>
)

export default Icon
