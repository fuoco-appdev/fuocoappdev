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
      d="m22 5.7-4.6-3.9-1.3 1.5 4.6 3.9L22 5.7ZM7.9 3.4 6.6 1.9 2 5.7l1.3 1.5 4.6-3.8ZM11 8h1.5v5.3l4 2.4-.8 1.2L11 14V8Zm1-4c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9Zm-7 9c0 3.9 3.1 7 7 7s7-3.1 7-7-3.1-7-7-7-7 3.1-7 7Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
