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
      d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7Zm0 2a2 2 0 1 1 .001 4.001A2 2 0 0 1 12 4Zm-4 7.85c.86 1.3 2.33 2.15 4 2.15s3.14-.85 4-2.15c-.02-1.32-2.67-2.05-4-2.05s-3.98.73-4 2.05Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
