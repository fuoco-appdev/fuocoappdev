import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m12 5.5 6 4.5v9H6v-9l6-4.5ZM12 3 4 9v12h16V9l-8-6Zm-.5 6.5v3H11v-3h-1v3h-.5v-3h-1v3c0 .83.67 1.5 1.5 1.5v4h1v-4c.83 0 1.5-.67 1.5-1.5v-3h-1Zm1.5 2v3h1V18h1V9.5c-1.1 0-2 .9-2 2Z" />
  </Svg>
)

export default Icon
