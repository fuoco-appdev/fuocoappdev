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
      d="M14.99 10v3L11 9l3.99-4v3H22v2h-7.01ZM2 14h7.01v-3L13 15l-3.99 4v-3H2v-2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
