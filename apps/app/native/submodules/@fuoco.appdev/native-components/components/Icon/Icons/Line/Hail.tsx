import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12.5 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Zm5-4h2c0 2.7-.93 4.41-2.3 5.5-.5.4-1.1.7-1.7.9V22h-2v-6h-2v6h-2V10.1c-.3.1-.5.2-.6.3-.53.41-1.4 1.03-1.4 3.6h-2c0-2.06.35-3.78 2.11-5.29C8.71 7.81 10.5 7 12.5 7c2 0 2.68-.46 3.48-1.06.48-.39 1.52-1.18 1.52-3.94Zm-13 14h3v6h-3v-6Z" />
  </Svg>
)

export default Icon
