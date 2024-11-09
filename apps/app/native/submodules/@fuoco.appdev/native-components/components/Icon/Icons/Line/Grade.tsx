import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m12 7.63 1.44 3.4 1.2.1 2.47.21-2.79 2.42.27 1.18.56 2.41-2.12-1.28-1.03-.64-1.03.62-2.12 1.28.56-2.41.27-1.18-2.79-2.42 2.47-.21 1.2-.1.47-1.11.97-2.27Zm0-5.13L9.19 9.13 2 9.74l5.46 4.73-1.64 7.03L12 17.77l6.18 3.73-1.64-7.03L22 9.74l-7.19-.61L12 2.5Z" />
  </Svg>
)

export default Icon
