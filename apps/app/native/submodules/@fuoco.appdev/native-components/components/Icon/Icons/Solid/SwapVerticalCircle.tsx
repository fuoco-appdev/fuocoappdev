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
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM6.5 9 10 5.5 13.5 9H11v4H9V9H6.5Zm4 6 3.5 3.5 3.5-3.5H15v-4h-2v4h-2.5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
