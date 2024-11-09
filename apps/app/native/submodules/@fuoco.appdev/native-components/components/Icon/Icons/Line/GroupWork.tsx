import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Z" />
    <Path d="M8 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <Path d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <Path d="M16 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
  </Svg>
)

export default Icon