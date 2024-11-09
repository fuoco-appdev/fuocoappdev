import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M7.485 3.295h13.17a2 2 0 0 1 2 2v12c0 .34-.09.66-.23.94l-1.77-1.77v-9.17h-9.17l-4-4Zm13.66 19.31-3.32-3.31H4.655a2 2 0 0 1-2-2v-12c0-.34.08-.66.23-.94l-1.54-1.55 1.41-1.41 19.8 19.8-1.41 1.41Zm-5.32-5.31-10-10h-1.17v10h11.17Z" />
  </Svg>
)

export default Icon
