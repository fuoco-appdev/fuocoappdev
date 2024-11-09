import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20 15H4v-2h16v2Zm0 2H4v2h16v-2Zm-5-6 5-3.55V5l-5 3.55L10 5 4 8.66V11l5.92-3.61L15 11Z" />
  </Svg>
)

export default Icon
