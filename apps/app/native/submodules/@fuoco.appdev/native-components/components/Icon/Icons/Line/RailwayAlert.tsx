import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M9.5 17.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    <Path d="M3.5 11.5v-3h7.29c-.19-.63-.29-1.3-.29-2H3.93c.9-.77 3.28-1.08 6.65-.98.1-.7.3-1.37.59-1.99C2.47 3.17 1.5 5.52 1.5 7.5V17c0 1.93 1.57 3.5 3.5 3.5l-1.5 1v1h12v-1l-1.5-1c1.93 0 3.5-1.57 3.5-3.5v-3.5c-1.91 0-3.63-.76-4.89-2H3.5Zm12 5.5c0 .83-.67 1.5-1.5 1.5H5c-.83 0-1.5-.67-1.5-1.5v-3.5h12V17Z" />
    <Path d="M17.5 1.5c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5Zm.5 8h-1v-1h1v1Zm0-2h-1v-4h1v4Z" />
  </Svg>
)

export default Icon
