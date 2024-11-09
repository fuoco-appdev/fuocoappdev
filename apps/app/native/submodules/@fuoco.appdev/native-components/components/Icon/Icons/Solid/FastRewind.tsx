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
      d="M2.5 12 11 6v12l-8.5-6ZM20 18l-8.5-6L20 6v12Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
