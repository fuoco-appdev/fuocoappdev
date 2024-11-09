import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M16.96 5.73A7.976 7.976 0 0 1 20 12c0 2.54-1.19 4.81-3.04 6.27L16 24H8l-.95-5.73A7.94 7.94 0 0 1 4 12a7.94 7.94 0 0 1 3.05-6.27L8 0h8l.96 5.73ZM12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
