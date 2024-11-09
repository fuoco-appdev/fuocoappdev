import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M21.5 5.5v2h-3v3h-2v-3h-3v-2h3v-3h2v3h3Zm-3 14h-14v-14h6v-2h-6c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6h-2v6Zm-4-6v4h2v-4h-2Zm-4 4h2v-8h-2v8Zm-2 0v-6h-2v6h2Z" />
  </Svg>
)

export default Icon
