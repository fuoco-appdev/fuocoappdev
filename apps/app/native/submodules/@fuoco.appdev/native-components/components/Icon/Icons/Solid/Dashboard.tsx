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
      d="M11 13H3V3h8v10Zm0 8H3v-6h8v6Zm2 0h8V11h-8v10Zm0-12V3h8v6h-8Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
