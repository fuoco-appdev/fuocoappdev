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
      d="M3 9V5c0-1.1.9-2 2-2h4v2H5v4H3Zm0 6h2v4h4v2H5c-1.1 0-2-.9-2-2v-4Zm16 4h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4ZM15 3h4c1.1 0 2 .9 2 2v4h-2V5h-4V3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
