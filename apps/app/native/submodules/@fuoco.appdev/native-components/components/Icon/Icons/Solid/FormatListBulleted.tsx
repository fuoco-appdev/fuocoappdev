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
      d="M2.5 6c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S4.83 7.5 4 7.5 2.5 6.83 2.5 6Zm0 6c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5ZM4 16.5c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5ZM21 19H7v-2h14v2ZM7 13h14v-2H7v2Zm0-6V5h14v2H7Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
