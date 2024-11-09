import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M13 12.9a5 5 0 1 0-2 0v4.27l-1.59-1.59L8 17l4 4 4-4-1.41-1.41L13 17.17V12.9ZM15 8c0 1.66-1.34 3-3 3S9 9.66 9 8s1.34-3 3-3 3 1.34 3 3Z" />
  </Svg>
)

export default Icon
