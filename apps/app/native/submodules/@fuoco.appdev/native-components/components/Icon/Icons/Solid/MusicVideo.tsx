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
      d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm0 2v14H3V5h18Zm-10 7c-1.66 0-3 1.34-3 3s1.34 3 3 3c1.65 0 2.98-1.33 3-2.97V8h3V6h-5v6.18c-.31-.11-.65-.18-1-.18Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
