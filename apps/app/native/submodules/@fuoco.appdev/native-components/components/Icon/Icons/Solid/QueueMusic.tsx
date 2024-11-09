import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M3 6h12v2H3V6Zm0 4h12v2H3v-2Zm0 6h8v-2H3v2Zm14-1.82V6h5v2h-3v9c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3c.35 0 .69.07 1 .18Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
