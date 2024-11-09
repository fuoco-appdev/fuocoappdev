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
      d="M3 9h2V7H3v2Zm2 4H3v-2h2v2Zm0 4H3v-2h2v2Zm16-4H7v-2h14v2ZM7 17h14v-2H7v2Zm0-8V7h14v2H7Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
