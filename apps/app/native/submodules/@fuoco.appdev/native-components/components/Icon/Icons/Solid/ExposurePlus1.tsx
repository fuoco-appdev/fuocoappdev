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
      d="M18 18h2V5h-.3L15 6.7v1.7l3-1.02V18ZM8 7h2v4h4v2h-4v4H8v-4H4v-2h4V7Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
