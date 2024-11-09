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
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93ZM16 16c.9 0 1.64.58 1.9 1.39C19.2 15.97 20 14.08 20 12c0-3.35-2.07-6.22-5-7.41V5c0 1.1-.9 2-2 2h-2v2c0 .55-.45 1-1 1H8v2h6c.55 0 1 .45 1 1v3h1Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
