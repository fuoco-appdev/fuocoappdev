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
      d="M7 5v3l-4 4 4 4v3l-7-7 7-7Zm6 0v4c7 1 10 6 11 11-2.5-3.5-6-5.1-11-5.1V19l-7-7 7-7Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
