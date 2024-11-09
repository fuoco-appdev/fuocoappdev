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
      d="M7 7h10v3l4-4-4-4v3H5v6h2V7Zm12 6h-2v4H7v-3l-4 4 4 4v-3h12v-6Zm-6-4v6h-1.5v-4H10v-1l2-1h1Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
