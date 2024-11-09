import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M5.485 1.345h15.17c1.1 0 2 .9 2 2v15.17l-2-2V3.345H7.485l-2-2Zm6.09 4-.57 1.52 1.36 1.36.23-.66h.1l.54 1.52 3.04 3.04-2.55-6.78h-2.15Zm9.57 17.31-1.32-1.31H4.655c-1.1 0-2-.9-2-2V4.175l-1.31-1.32 1.41-1.41 19.8 19.8-1.41 1.41Zm-3.32-3.31-5.07-5.07h-2.52l-1.09 3.07h-2.08l2.39-6.37-4.8-4.8v13.17h13.17Z" />
  </Svg>
)

export default Icon
