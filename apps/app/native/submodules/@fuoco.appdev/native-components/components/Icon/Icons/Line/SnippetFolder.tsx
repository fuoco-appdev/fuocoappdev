import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2Zm0 12H4V6h5.17l2 2H20v10Zm-2.5-5.88v3.38h-3v-5h1.38l1.62 1.62ZM13 9v8h6v-5.5L16.5 9H13Z" />
  </Svg>
)

export default Icon
