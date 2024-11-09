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
      d="M10 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h5v2h2V1h-2v2Zm0 15H5l5-6v6Zm4-15h5c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2h-5v-9l5 6V5h-5V3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
