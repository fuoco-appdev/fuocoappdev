import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M5 11.09v-4.7l6-2.25 6 2.25v3.69c.71.1 1.38.31 2 .6V5l-8-3-8 3v6.09c0 5.05 3.41 9.76 8 10.91.03-.01.05-.02.08-.02-.79-.78-1.4-1.76-1.75-2.84C6.76 17.53 5 14.42 5 11.09Z" />
    <Path d="M16 12c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5Zm3 5.5h-2.5V20h-1v-2.5H13v-1h2.5V14h1v2.5H19v1Z" />
  </Svg>
)

export default Icon
