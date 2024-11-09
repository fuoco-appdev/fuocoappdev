import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M2.934 8.5h11v2h-11v-2Zm0-2h11v-2h-11v2Zm0 8h7v-2h-7v2Zm15.01-3.13.71-.71a.996.996 0 0 1 1.41 0l.71.71c.39.39.39 1.02 0 1.41l-.71.71-2.12-2.12Zm-.71.71-5.3 5.3v2.12h2.12l5.3-5.3-2.12-2.12Z" />
  </Svg>
)

export default Icon
