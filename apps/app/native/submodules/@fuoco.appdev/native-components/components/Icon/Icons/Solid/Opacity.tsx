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
      d="M12 2.35 17.66 8A8.02 8.02 0 0 1 20 13.64c0 2-.78 4.11-2.34 5.67a7.99 7.99 0 0 1-11.32 0C4.78 17.75 4 15.64 4 13.64S4.78 9.56 6.34 8L12 2.35ZM7.76 9.6C6.62 10.73 6.01 12 6 14h12c-.01-2-.62-3.23-1.76-4.35L12 5.27 7.76 9.6Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
