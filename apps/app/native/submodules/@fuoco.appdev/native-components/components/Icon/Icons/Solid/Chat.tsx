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
      d="M4 2h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H6l-3.99 4V4c0-1.1.89-2 1.99-2Zm14 7H6v2h12V9Zm-4 5H6v-2h8v2ZM6 8h12V6H6v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
