import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 3.5c-4.69 0-8.93 1.9-12 4.98L12 20.5 24 8.48A16.88 16.88 0 0 0 12 3.5ZM2.92 8.57C5.51 6.58 8.67 5.5 12 5.5s6.49 1.08 9.08 3.07L12 17.67l-9.08-9.1Z" />
  </Svg>
)

export default Icon
