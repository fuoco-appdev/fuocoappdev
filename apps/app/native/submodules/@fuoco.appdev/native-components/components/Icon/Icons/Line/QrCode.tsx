import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M3 11h8V3H3v8Zm2-6h4v4H5V5Z" />
    <Path d="M3 21h8v-8H3v8Zm2-6h4v4H5v-4Z" />
    <Path d="M13 3v8h8V3h-8Zm6 6h-4V5h4v4Z" />
    <Path d="M21 19h-2v2h2v-2Z" />
    <Path d="M15 13h-2v2h2v-2Z" />
    <Path d="M17 15h-2v2h2v-2Z" />
    <Path d="M15 17h-2v2h2v-2Z" />
    <Path d="M17 19h-2v2h2v-2Z" />
    <Path d="M19 17h-2v2h2v-2Z" />
    <Path d="M19 13h-2v2h2v-2Z" />
    <Path d="M21 15h-2v2h2v-2Z" />
  </Svg>
)

export default Icon
