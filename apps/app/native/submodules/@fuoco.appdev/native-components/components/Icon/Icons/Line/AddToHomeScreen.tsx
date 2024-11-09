import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18.5 1.01 8.5 1c-1.1 0-2 .9-2 2v3h2V5h10v14h-10v-1h-2v3c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99ZM10.5 15h2V8h-7v2h3.59L3.5 15.59 4.91 17l5.59-5.59V15Z" />
  </Svg>
)

export default Icon
