import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 18H9a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h1v5l2-1.5L14 7V2h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2Zm-2 2v2H5a2 2 0 0 1-2-2V6h2v14h12Z" />
  </Svg>
)

export default Icon
