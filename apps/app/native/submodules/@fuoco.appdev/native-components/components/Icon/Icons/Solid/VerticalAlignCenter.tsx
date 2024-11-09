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
      d="M16 5h-3V1h-2v4H8l4 4 4-4ZM8 19h3v4h2v-4h3l-4-4-4 4Zm-4-6v-2h16v2H4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
