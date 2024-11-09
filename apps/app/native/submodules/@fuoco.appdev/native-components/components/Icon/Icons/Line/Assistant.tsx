import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 1.5H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2Zm0 16h-4.83L12 19.67 9.83 17.5H5v-14h14v14Zm-7-1 1.88-4.12L18 10.5l-4.12-1.88L12 4.5l-1.88 4.12L6 10.5l4.12 1.88L12 16.5Z" />
  </Svg>
)

export default Icon
