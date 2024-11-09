import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm-.99-14L6.88 17h1.9l1-2.81h4.44l.99 2.81h1.9L12.98 6h-1.97Zm-.66 6.59 1.6-4.55h.09l1.6 4.55h-3.29Z" />
  </Svg>
)

export default Icon
