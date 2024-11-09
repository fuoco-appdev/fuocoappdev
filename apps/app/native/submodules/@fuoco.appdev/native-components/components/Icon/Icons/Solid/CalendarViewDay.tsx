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
      d="M21 6H3v2h18V6ZM3 10h18v5H3v-5Zm0 7h18v2H3v-2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
