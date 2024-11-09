import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2ZM5.5 7.5h2v-2H9v2h2V9H9v2H7.5V9h-2V7.5ZM19 19H5L19 5v14Zm-2-2v-1.5h-5V17h5Z" />
  </Svg>
)

export default Icon
