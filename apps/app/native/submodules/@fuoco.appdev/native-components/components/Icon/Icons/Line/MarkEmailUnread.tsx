import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M22 9.98V19c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2l.01-12c0-1.1.89-2 1.99-2h10.1c-.06.32-.1.66-.1 1 0 .34.04.68.1 1H4l8 5 3.67-2.29c.47.43 1.02.76 1.63.98L12 14 4 9v10h16v-8.1c.74-.15 1.42-.48 2-.92ZM16 6c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3Z" />
  </Svg>
)

export default Icon
