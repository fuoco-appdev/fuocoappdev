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
      d="M5 9c0-3.87 3.13-7 7-7s7 3.13 7 7c0 5.25-7 13-7 13S5 14.25 5 9Zm4.5 0a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0-5 0Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
