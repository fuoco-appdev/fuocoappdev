import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M15 1.505H9v2h6v-2Zm-4 13h2v-6h-2v6Zm8.03-6.62 1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4.495a9 9 0 0 0-9 9c0 4.97 4.02 9 9 9s9-4.03 9-9c0-2.11-.74-4.06-1.97-5.61ZM12 20.505c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7Z" />
  </Svg>
)

export default Icon
