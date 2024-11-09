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
      d="M2 8V6h20v2H2Zm0 3v2h20v-2H2Zm0 5v2h20v-2H2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
