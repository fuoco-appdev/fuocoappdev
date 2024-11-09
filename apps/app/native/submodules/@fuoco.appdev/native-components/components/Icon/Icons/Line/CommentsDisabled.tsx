import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19.485 15.345h1.17v-12H7.485l-2-2h15.17c1.1 0 2 .9 2 2v15.17l-3.17-3.17Zm-.83-10h-9.17l2 2h7.17v-2Zm0 3h-6.17l2 2h4.17v-2Zm0 5v-2h-3.17l2 2h1.17Zm3.9 7.9-1.41 1.41-5.32-5.31H4.655c-1.1 0-2-.9-2-2V4.175l-1.31-1.32 1.41-1.41 19.8 19.8Zm-8.73-5.9-2-2h-5.17v-2h3.17l-1-1h-2.17v-2h.17l-2.17-2.17v9.17h9.17Z" />
  </Svg>
)

export default Icon
