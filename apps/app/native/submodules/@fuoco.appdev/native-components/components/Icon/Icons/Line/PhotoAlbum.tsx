import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm0 18H6V4h5v7l2.5-1.5L16 11V4h2v16Zm-4.38-6.5L17 18H7l2.38-3.17L11 17l2.62-3.5Z" />
  </Svg>
)

export default Icon
