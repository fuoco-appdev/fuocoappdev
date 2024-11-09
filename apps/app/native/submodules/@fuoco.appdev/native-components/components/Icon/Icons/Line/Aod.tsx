import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17 1.01 7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99ZM17 21H7v-1h10v1Zm0-3H7V6h10v12Zm0-14H7V3h10v1Zm-9 6h8v1.5H8V10Zm1 3h6v1.5H9V13Z" />
  </Svg>
)

export default Icon
