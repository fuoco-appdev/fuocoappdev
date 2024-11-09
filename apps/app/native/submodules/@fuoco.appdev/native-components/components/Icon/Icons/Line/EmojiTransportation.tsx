import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20.57 10.66c-.14-.4-.52-.66-.97-.66h-7.19c-.46 0-.83.26-.98.66L10 14.77l.01 5.51c0 .38.31.72.69.72h.62c.38 0 .68-.38.68-.76V19h8v1.24c0 .38.31.76.69.76h.61c.38 0 .69-.34.69-.72l.01-1.37v-4.14l-1.43-4.11Zm-8.16.34h7.19l1.03 3h-9.25l1.03-3ZM12 17c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Zm8 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Z" />
    <Path d="M14 9h1V3H7v5H2v13h1V9h5V4h6v5Z" />
    <Path d="M7 11H5v2h2v-2Z" />
    <Path d="M12 5h-2v2h2V5Z" />
    <Path d="M7 15H5v2h2v-2Z" />
    <Path d="M7 19H5v2h2v-2Z" />
  </Svg>
)

export default Icon
