import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m16.6 10.88-1.42-1.42-4.24 4.25-2.12-2.13L7.4 13l3.54 3.54 5.66-5.66Z" />
    <Path d="M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6a2 2 0 0 0-2-2Zm0 14H5V8h14v10Z" />
  </Svg>
)

export default Icon
