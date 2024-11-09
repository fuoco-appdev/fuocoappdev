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
      d="m2 6.27 1.41-1.41 14.73 14.73L16.73 21l-5.66-5.66L9.5 19h-3l2.47-5.76L2 6.27ZM20 5v3h-5.79l-1.45 3.38-2.09-2.1.55-1.28H9.39l-3-3H20Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
