import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M16 4.2c1.5 0 3 .6 4.2 1.7l.8-.8C19.6 3.7 17.8 3 16 3c-1.8 0-3.6.7-5 2.1l.8.8C13 4.8 14.5 4.2 16 4.2Zm-3.3 2.5.8.8c.7-.7 1.6-1 2.5-1 .9 0 1.8.3 2.5 1l.8-.8c-.9-.9-2.1-1.4-3.3-1.4-1.2 0-2.4.5-3.3 1.4ZM19 13h-2V9h-2v4H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2Zm0 6H5v-4h14v4ZM6 16h2v2H6v-2Zm3.5 0h2v2h-2v-2Zm3.5 0h2v2h-2v-2Z" />
  </Svg>
)

export default Icon
