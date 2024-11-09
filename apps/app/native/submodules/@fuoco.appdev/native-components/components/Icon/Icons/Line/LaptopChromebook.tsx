import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M22 18.5v-15H2v15H0v2h24v-2h-2Zm-8 0h-4v-1h4v1Zm6-3H4v-10h16v10Z" />
  </Svg>
)

export default Icon
