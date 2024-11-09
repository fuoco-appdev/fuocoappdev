import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M11.56 15.33c-.34.27-.56.7-.56 1.17V22h7c1.1 0 2-.9 2-2v-5.98c-.94-.33-1.95-.52-3-.52-2.03 0-3.93.7-5.44 1.83Z" />
    <Path d="M17 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
    <Path d="M10.5 7c0-1.08.27-2.1.74-3H4c-1.1 0-2 .9-2 2v14c0 .55.23 1.05.59 1.41l9.82-9.82A6.435 6.435 0 0 1 10.5 7Z" />
  </Svg>
)

export default Icon
