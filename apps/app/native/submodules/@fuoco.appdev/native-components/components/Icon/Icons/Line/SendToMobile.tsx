import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m16.5 8 4 4-4 4-1.41-1.41L16.67 13H11.5v-2h5.17l-1.59-1.59L16.5 8Zm-11-6.99 10-.01c1.1 0 2 .9 2 2v4h-2V6h-10v12h10v-1h2v4c0 1.1-.9 2-2 2h-10c-1.1 0-2-.9-2-2V3c0-1.1.9-1.99 2-1.99ZM5.5 21h10v-1h-10v1Zm0-17h10V3h-10v1Z" />
  </Svg>
)

export default Icon
