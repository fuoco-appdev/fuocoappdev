import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m14.3 13.2 1.2 2.8h-2l-1.13-2.67H10.5V16h-2V8h5c1.13 0 2 .87 2 2v1.33c0 .8-.53 1.54-1.2 1.87Zm-.8-3.2h-3v1.33h3V10Z" />
  </Svg>
)

export default Icon
