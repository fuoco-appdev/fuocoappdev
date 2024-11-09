import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 7h-2v2h2V7Z" />
    <Path d="M19 11h-2v2h2v-2Z" />
    <Path d="M19 15h-2v2h2v-2Z" />
    <Path d="M1 11v10h6v-5h2v5h6V11L8 6l-7 5Zm12 8h-2v-5H5v5H3v-7l5-3.5 5 3.5v7Z" />
    <Path d="M10 3v1.97l2 1.43V5h9v14h-4v2h6V3H10Z" />
  </Svg>
)

export default Icon
