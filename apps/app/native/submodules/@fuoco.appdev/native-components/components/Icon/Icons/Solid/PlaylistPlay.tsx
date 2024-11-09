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
      d="M16 6H4v2h12V6Zm0 4H4v2h12v-2ZM4 14h8v2H4v-2Zm15 3-5 3v-6l5 3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
