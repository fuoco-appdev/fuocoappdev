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
      d="M17 18h2V5h-.3L14 6.7v1.7l3-1.02V18ZM4 13v-2h8v2H4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
