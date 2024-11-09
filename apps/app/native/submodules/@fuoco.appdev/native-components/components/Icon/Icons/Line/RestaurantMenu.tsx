import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m7.8 13.128 2.83-2.83-7.02-7.01a4.008 4.008 0 0 0 0 5.66l4.19 4.18Zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27l-9.76 9.76 1.41 1.41 6.89-6.87 6.88 6.88 1.41-1.41-6.88-6.88 1.47-1.47Z" />
  </Svg>
)

export default Icon
