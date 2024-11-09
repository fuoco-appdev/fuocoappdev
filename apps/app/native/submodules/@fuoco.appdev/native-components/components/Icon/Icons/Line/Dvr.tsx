import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm0 14H3V5h18v12Zm-2-9H8v2h11V8Zm0 4H8v2h11v-2ZM7 8H5v2h2V8Zm0 4H5v2h2v-2Z" />
  </Svg>
)

export default Icon
