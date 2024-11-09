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
      d="M9 1h6v2H9V1Zm2 13V8h2v6h-2Zm8.03-6.61 1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4a9 9 0 0 0-9 9c0 4.97 4.02 9 9 9a8.994 8.994 0 0 0 7.03-14.61ZM5 13c0 3.87 3.13 7 7 7s7-3.13 7-7-3.13-7-7-7-7 3.13-7 7Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
