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
      d="M4 9h16v2H4V9Zm16 6H4v-2h16v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
