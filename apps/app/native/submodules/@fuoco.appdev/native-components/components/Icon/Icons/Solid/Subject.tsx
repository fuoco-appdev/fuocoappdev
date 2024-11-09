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
      d="M4 7V5h16v2H4Zm0 2h16v2H4V9Zm0 8h10v2H4v-2Zm0-2h16v-2H4v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
