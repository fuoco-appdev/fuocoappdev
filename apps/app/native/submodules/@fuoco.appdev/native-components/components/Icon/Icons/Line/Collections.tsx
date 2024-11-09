import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20 4v12H8V4h12Zm0-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm-8.5 9.67 1.69 2.26 2.48-3.1L19 15H9l2.5-3.33ZM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2Z" />
  </Svg>
)

export default Icon
