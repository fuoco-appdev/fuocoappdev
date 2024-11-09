import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M8 11h3v10h2V11h3l-4-4-4 4ZM4 3v2h16V3H4Z" />
  </Svg>
)

export default Icon
