import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M5 20v2h5v2l3-3-3-3v2H5Zm9 0h5v2h-5v-2Zm3-20H7C5.9 0 5 .9 5 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2Zm0 16H7V2h10v14Zm-5-9c1.1 0 2-.9 1.99-2 0-1.1-.9-2-2-2S10 3.9 10 5a2 2 0 0 0 2 2Z" />
  </Svg>
)

export default Icon
