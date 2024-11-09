import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m4.675 2.1-1.41 1.41 10.38 10.38-1.41 1.41-4.24-4.24-1.41 1.41 5.66 5.66 2.83-2.83 6.6 6.6 1.41-1.41L4.675 2.1Zm13.21 10.38 4.95-4.96-1.43-1.4-4.94 4.94 1.42 1.42Zm-.71-4.96-1.41-1.41-2.12 2.12 1.41 1.41 2.12-2.12ZM.915 12.47l5.66 5.66 1.41-1.41-5.66-5.66-1.41 1.41Z" />
  </Svg>
)

export default Icon
