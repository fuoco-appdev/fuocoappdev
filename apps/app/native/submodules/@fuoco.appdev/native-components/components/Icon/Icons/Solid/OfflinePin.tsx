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
      d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2ZM7 18v-2h10v2H7Zm0-7.3 3.3 3.3L17 7.3l-1.4-1.4-5.3 5.3-1.9-1.9L7 10.7Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
