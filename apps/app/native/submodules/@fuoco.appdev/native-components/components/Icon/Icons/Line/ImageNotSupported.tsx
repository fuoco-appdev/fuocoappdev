import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m22.605 21.195-19.8-19.8-1.41 1.41 2.31 2.32v13.17c0 1.1.9 2 2 2h13.17l2.31 2.31 1.42-1.41Zm-16.9-2.9V7.125l6.84 6.84-.84 1.05-2-2.72-3 4h8.17l2 2H5.705Zm2.83-14-2-2h13.17c1.1 0 2 .9 2 2v13.17l-2-2V4.295H8.535Z" />
  </Svg>
)

export default Icon
