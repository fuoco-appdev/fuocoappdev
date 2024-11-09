import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M15 18H5V6h10v1h2V3c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4h-2v1ZM5 3h10v1H5V3Zm10 18H5v-1h10v1Z" />
    <Path d="M18.38 9.62 19 11l.62-1.38L21 9l-1.38-.62L19 7l-.62 1.38L17 9l1.38.62Z" />
    <Path d="m14 8-1.25 2.75L10 12l2.75 1.25L14 16l1.25-2.75L18 12l-2.75-1.25L14 8Z" />
    <Path d="m19 13-.62 1.38L17 15l1.38.62L19 17l.62-1.38L21 15l-1.38-.62L19 13Z" />
  </Svg>
)

export default Icon
