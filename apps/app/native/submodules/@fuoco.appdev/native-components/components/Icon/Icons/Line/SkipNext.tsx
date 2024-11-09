import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m6 18 8.5-6L6 6v12Zm2-8.14L11.03 12 8 14.14V9.86ZM16 6h2v12h-2V6Z" />
  </Svg>
)

export default Icon
