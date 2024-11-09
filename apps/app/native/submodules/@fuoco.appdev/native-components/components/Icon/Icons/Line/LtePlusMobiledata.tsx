import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M2.5 14h3v2h-5V8h2v6Zm2-4h2v6h2v-6h2V8h-6v2Zm7 6h5v-2h-3v-1h3v-2h-3v-1h3V8h-5v8Zm12-5h-2V9h-2v2h-2v2h2v2h2v-2h2v-2Z" />
  </Svg>
)

export default Icon
