import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12.2 4.91A8 8 0 0 1 16.5 12a8 8 0 0 1-4.3 7.09c1.46-2 2.3-4.46 2.3-7.09s-.84-5.09-2.3-7.09ZM8.5 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.02 2 8.5 2Z" />
  </Svg>
)

export default Icon
