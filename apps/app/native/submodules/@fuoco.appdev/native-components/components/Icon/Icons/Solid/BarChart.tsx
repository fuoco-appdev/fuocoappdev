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
      d="M10.6 5h2.8v14h-2.8V5ZM5 9.2h3V19H5V9.2ZM19 13h-2.8v6H19v-6Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
