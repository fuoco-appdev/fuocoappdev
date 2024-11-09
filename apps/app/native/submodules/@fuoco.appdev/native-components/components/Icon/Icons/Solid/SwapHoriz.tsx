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
      d="M17.01 5 21 9l-3.99 4v-3H10V8h7.01V5ZM3 15l3.99-4v3H14v2H6.99v3L3 15Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
