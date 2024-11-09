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
      d="M3 11V5h19v6H3Zm0 8h6v-7H3v7Zm7 0h12v-7H10v7Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
