import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 1.5H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2Zm0 16h-4.83L12 19.67 9.83 17.5H5v-14h14v14Zm-8-3h2v2h-2v-2Zm1-8c1.1 0 2 .9 2 2 0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4s-4 1.79-4 4h2c0-1.1.9-2 2-2Z" />
  </Svg>
)

export default Icon
