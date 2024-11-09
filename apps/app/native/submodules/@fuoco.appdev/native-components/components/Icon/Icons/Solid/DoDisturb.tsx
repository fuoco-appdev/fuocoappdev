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
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31A7.902 7.902 0 0 1 12 20ZM7.1 5.69 18.31 16.9A7.902 7.902 0 0 0 20 12c0-4.42-3.58-8-8-8-1.85 0-3.55.63-4.9 1.69Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
