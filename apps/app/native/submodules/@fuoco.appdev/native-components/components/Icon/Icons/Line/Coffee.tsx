import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17.5 3H5c-1.1 0-2 .9-2 2v5.71c0 3.83 2.95 7.18 6.78 7.29 3.96.12 7.22-3.06 7.22-7v-1h.5c1.93 0 3.5-1.57 3.5-3.5S19.43 3 17.5 3ZM15 5v3H5V5h10Zm0 5v1c0 2.76-2.24 5-5 5s-5-2.24-5-5v-1h10Zm2.5-2H17V5h.5c.83 0 1.5.67 1.5 1.5S18.33 8 17.5 8ZM3 19h16v2H3v-2Z" />
  </Svg>
)

export default Icon
