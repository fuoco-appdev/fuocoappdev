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
      d="M20 9H4v2h16V9Zm-6 4H4v2h10v-2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
