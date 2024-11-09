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
      d="M1 17C1 10.93 5.93 6 12 6s11 4.93 11 11h-2c0-4.96-4.04-9-9-9s-9 4.04-9 9H1Zm4 0c0-3.86 3.14-7 7-7s7 3.14 7 7h-2c0-2.76-2.24-5-5-5s-5 2.24-5 5H5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
