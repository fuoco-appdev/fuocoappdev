import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M4 11V5h17v6H4Zm17 7H4v-6h17v6Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
