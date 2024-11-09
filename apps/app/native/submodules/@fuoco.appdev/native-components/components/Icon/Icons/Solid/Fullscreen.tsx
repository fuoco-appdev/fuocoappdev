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
      d="M7 10H5V5h5v2H7v3Zm-2 4h2v3h3v2H5v-5Zm12 3h-3v2h5v-5h-2v3ZM14 7V5h5v5h-2V7h-3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
