import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M23.64 7.595c-.45-.34-4.93-4-11.64-4-1.32 0-2.55.14-3.69.38l10.12 10.12 5.21-6.5ZM3.41 1.905 2 3.315l2.05 2.05c-2.14.99-3.46 2.05-3.69 2.23L12 22.095l3.91-4.87 3.32 3.32 1.41-1.41L3.41 1.905Z" />
  </Svg>
)

export default Icon
