import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M22 7.98V17c0 1.1-.9 2-2 2H6l-4 4V5c0-1.1.9-2 2-2h10.1c-.06.32-.1.66-.1 1 0 .34.04.68.1 1H4v12h16V8.9c.74-.15 1.42-.48 2-.92ZM16 4c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3Z" />
  </Svg>
)

export default Icon
