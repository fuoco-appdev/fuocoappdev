import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M4 9.5v2h16v-2H4Zm12-5-1.41-1.41L13 4.67V1.5h-2v3.19L9.39 3.11 8 4.5l4 4 4-4Zm-12 10h16v-2H4v2Zm4 5 1.39 1.39L11 19.31v3.19h2v-3.17l1.59 1.59L16 19.5l-4-4-4 4Z" />
  </Svg>
)

export default Icon
