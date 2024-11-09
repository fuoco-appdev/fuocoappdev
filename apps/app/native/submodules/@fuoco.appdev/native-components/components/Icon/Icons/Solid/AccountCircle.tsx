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
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3ZM6 15.98a7.2 7.2 0 0 0 12 0c-.03-1.99-4.01-3.08-6-3.08-2 0-5.97 1.09-6 3.08Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
