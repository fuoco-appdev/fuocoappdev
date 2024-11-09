import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M13.5 9.5h-11v2h11v-2Z" />
    <Path d="M13.5 5.5h-11v2h11v-2Z" />
    <Path d="M9.5 13.5h-7v2h7v-2Z" />
    <Path d="m20.09 11.43-4.25 4.24-2.12-2.12-1.41 1.41 3.53 3.54 5.66-5.66-1.41-1.41Z" />
  </Svg>
)

export default Icon
