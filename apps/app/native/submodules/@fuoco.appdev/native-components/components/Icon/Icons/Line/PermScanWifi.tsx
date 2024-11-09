import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 2.5c-5.05 0-8.85 1.85-12 4.23L12 21.5 24 6.75C20.85 4.37 17.05 2.5 12 2.5ZM2.92 7.15C5.8 5.35 8.74 4.5 12 4.5c3.25 0 6.18.85 9.08 2.67L12 18.33 2.92 7.15ZM11 9.5h2v6h-2v-6Zm0-4h2v2h-2v-2Z" />
  </Svg>
)

export default Icon
