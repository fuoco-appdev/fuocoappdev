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
      d="M4 5V3h16v2H4Zm7 6H8l4-4 4 4h-3v10h-2V11Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
