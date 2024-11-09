import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 7V3H2v18h20V7H12Zm-2 12H4v-2h6v2Zm0-4H4v-2h6v2Zm0-4H4V9h6v2Zm0-4H4V5h6v2Zm10 12h-8V9h8v10Zm-2-8h-4v2h4v-2Zm0 4h-4v2h4v-2Z" />
  </Svg>
)

export default Icon
