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
      d="M7.88 3.39 6.6 1.86 2 5.71l1.29 1.53 4.59-3.85ZM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72ZM11 8h1.5v5.25l4 2.37-.75 1.23L11 14V8Zm1-4a9 9 0 0 0-9 9c0 4.97 4.02 9 9 9a9 9 0 0 0 0-18Zm-7 9c0 3.87 3.13 7 7 7s7-3.13 7-7-3.13-7-7-7-7 3.13-7 7Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
