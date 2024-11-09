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
      d="M2 6h12v2H2V6Zm0 4h12v2H2v-2Zm16 0h-2v4h-4v2h4v4h2v-4h4v-2h-4v-4Zm-8 6H2v-2h8v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
