import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m14.31 2 .41 2.48C13.87 4.17 12.96 4 12 4c-.95 0-1.87.17-2.71.47L9.7 2h4.61Zm.41 17.52L14.31 22H9.7l-.41-2.47c.84.3 1.76.47 2.71.47.96 0 1.87-.17 2.72-.48ZM16 0H8l-.95 5.73A7.94 7.94 0 0 0 4 12a7.94 7.94 0 0 0 3.05 6.27L8 24h8l.96-5.73A7.976 7.976 0 0 0 20 12c0-2.54-1.19-4.81-3.04-6.27L16 0Zm-4 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6Z" />
  </Svg>
)

export default Icon
