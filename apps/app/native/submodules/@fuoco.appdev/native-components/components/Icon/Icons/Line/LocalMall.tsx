import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 6.5h-2c0-2.76-2.24-5-5-5s-5 2.24-5 5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2Zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3Zm7 17H5v-12h14v12Zm-7-8c-1.66 0-3-1.34-3-3H7c0 2.76 2.24 5 5 5s5-2.24 5-5h-2c0 1.66-1.34 3-3 3Z" />
  </Svg>
)

export default Icon
