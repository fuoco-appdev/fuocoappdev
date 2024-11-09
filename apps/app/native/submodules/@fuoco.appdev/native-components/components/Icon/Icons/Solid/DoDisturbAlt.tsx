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
      d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2ZM4 12c0-4.4 3.6-8 8-8 1.8 0 3.5.6 4.9 1.7L5.7 16.9C4.6 15.5 4 13.8 4 12Zm3.1 6.3C8.5 19.4 10.2 20 12 20c4.4 0 8-3.6 8-8 0-1.8-.6-3.5-1.7-4.9L7.1 18.3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
