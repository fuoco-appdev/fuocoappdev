import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17.34 18H5.8l8.25-12h5.54l-2.25 12ZM13 4 2 20h17l3-16h-9Zm1.5 5a2.5 2.5 0 0 0 0 5 2.5 2.5 0 0 0 0-5Z" />
  </Svg>
)

export default Icon
