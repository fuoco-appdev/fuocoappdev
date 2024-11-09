import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2Zm0 10H3V8h18v8ZM6 15h2v-2h2v-2H8V9H6v2H4v2h2v2Z" />
    <Path d="M14.5 15a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    <Path d="M18.5 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
  </Svg>
)

export default Icon
