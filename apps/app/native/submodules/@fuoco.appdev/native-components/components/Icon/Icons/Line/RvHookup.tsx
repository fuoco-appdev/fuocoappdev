import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 17v-6c0-1.1-.9-2-2-2H6V7l-3 3 3 3v-2h4v3H3v3c0 1.1.9 2 2 2h2c0 1.66 1.34 3 3 3s3-1.34 3-3h8v-2h-2Zm-9 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Zm7-6h-4v-3h4v3ZM16 2v2H8v2h8v2l3-3-3-3Z" />
  </Svg>
)

export default Icon
