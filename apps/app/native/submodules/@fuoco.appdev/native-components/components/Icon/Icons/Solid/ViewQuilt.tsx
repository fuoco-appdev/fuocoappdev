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
      d="M9 18H4V5h5v13Zm6 0h-5v-6h5v6Zm1 0h5v-6h-5v6Zm-6-7V5h11v6H10Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
