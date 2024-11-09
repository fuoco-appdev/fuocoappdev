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
      d="M9 11H4V5h5v6Zm0 7H4v-6h5v6Zm1 0h5v-6h-5v6Zm11 0h-5v-6h5v6Zm-11-7h5V5h-5v6Zm6 0V5h5v6h-5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
