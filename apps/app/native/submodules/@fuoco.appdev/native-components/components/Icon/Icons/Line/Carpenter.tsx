import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20.018 14.537 7.288 1.807l-3.89 3.89 8.13 11.67c-.78.78-.78 2.05 0 2.83l1.41 1.41c.78.78 2.05.78 2.83 0l4.24-4.24c.79-.78.79-2.05.01-2.83Zm-14.02-8.61 1.29-1.29 8.49 8.49-2.81 2.81-6.97-10.01Zm8.36 14.26-1.41-1.41 4.24-4.24 1.41 1.41-4.24 4.24Z" />
  </Svg>
)

export default Icon
