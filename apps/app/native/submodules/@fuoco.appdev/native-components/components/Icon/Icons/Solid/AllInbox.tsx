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
      d="M19 3H5c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm0 6h-4c0 1.62-1.38 3-3 3s-3-1.38-3-3H5V5h14v4Zm2 7h-6c0 1.66-1.34 3-3 3s-3-1.34-3-3H3v3c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
