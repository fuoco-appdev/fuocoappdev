import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M16.5 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4ZM14 12a2.5 2.5 0 0 1 2.5-2.5c.42 0 .8.11 1.15.29l-3.36 3.36c-.18-.35-.29-.73-.29-1.15Zm2.5 2.5c-.42 0-.8-.11-1.15-.29l3.36-3.36c.18.35.29.73.29 1.15a2.5 2.5 0 0 1-2.5 2.5Z" />
    <Path d="M15.5 18h-10V6h10v1h2V3c0-1.1-.9-2-2-2h-10c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4h-2v1ZM5.5 3h10v1h-10V3Zm10 18h-10v-1h10v1Z" />
  </Svg>
)

export default Icon
