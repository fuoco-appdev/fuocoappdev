import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 4c0-1.1-.9-2-2-2h-3v2h3v2.65L13.52 11H10V6H6c-2.21 0-4 1.79-4 4v3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4.48L19 7.35V4ZM4 11v-1c0-1.1.9-2 2-2h2v3H4Zm3 3c-.55 0-1-.45-1-1h2c0 .55-.45 1-1 1Z" />
    <Path d="M10 3H5v2h5V3Z" />
    <Path d="M19 10c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3Zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Z" />
    <Path d="M7 19h4v-2l6 3h-4v2l-6-3Z" />
  </Svg>
)

export default Icon
