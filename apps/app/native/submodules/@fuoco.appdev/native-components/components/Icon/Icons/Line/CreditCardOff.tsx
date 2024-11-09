import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M7.485 3.295h13.17c1.11 0 2 .89 2 2v12c0 .34-.08.66-.23.94l-1.77-1.77v-5.17h-5.17l-4-4h9.17v-2H9.485l-2-2Zm13.66 19.31-3.32-3.31H4.655c-1.11 0-2-.89-2-2l.01-12c0-.34.08-.66.23-.93l-1.55-1.56 1.41-1.41 19.8 19.8-1.41 1.41ZM4.655 6.125v1.17h1.17l-1.17-1.17Zm11.17 11.17-6-6h-5.17v6h11.17Z" />
  </Svg>
)

export default Icon
