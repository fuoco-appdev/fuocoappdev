import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M7 18h2V6H7v12Zm4 4h2V2h-2v20Zm-8-8h2v-4H3v4Zm12 4h2V6h-2v12Zm4-8v4h2v-4h-2Z" />
  </Svg>
)

export default Icon
