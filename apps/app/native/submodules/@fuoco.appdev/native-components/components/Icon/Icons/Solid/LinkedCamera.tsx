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
      d="M20.67 8H22c0-3.31-2.69-6-6-6v1.33c2.58 0 4.67 2.09 4.67 4.67ZM12 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.33-9H18c0-1.11-.89-2-2-2V4.67c1.84 0 3.33 1.49 3.33 3.33ZM15 7V4H9L7.17 6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9h-5c0-1.11-.89-2-2-2Zm-8 7c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
