import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M11 7h6v2h-6V7Zm0 4h6v2h-6v-2Zm0 4h6v2h-6v-2ZM7 7h2v2H7V7Zm0 4h2v2H7v-2Zm0 4h2v2H7v-2ZM20.1 3H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9ZM19 19H5V5h14v14Z" />
  </Svg>
)

export default Icon
