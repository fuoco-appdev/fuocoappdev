import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3ZM9 3 5 6.99h3V14h2V6.99h3L9 3Zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3ZM9 3 5 6.99h3V14h2V6.99h3L9 3Z" />
  </Svg>
)

export default Icon
