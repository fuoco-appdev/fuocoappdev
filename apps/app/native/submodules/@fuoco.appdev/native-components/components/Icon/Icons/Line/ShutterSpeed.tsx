import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M15 1.5H9v2h6v-2Zm4.03 6.39 1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4.5a9 9 0 0 0-9 9c0 4.97 4.02 9 9 9a8.994 8.994 0 0 0 7.03-14.61ZM12 20.5c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7Zm-.32-5H6.35a5.992 5.992 0 0 0 3.41 3.56L9.65 19l2.03-3.5Zm5.97-4a6.012 6.012 0 0 0-3.34-3.54l-2.05 3.54h5.39Zm-7.04 7.83c.45.11.91.17 1.39.17 1.34 0 2.57-.45 3.57-1.19l-2.11-3.9-2.85 4.92ZM7.55 9.49A5.965 5.965 0 0 0 6 13.5c0 .34.04.67.09 1h4.72L7.55 9.49Zm8.79 8.14A5.94 5.94 0 0 0 18 13.5c0-.34-.04-.67-.09-1h-4.34l2.77 5.13Zm-3.01-9.98c-.43-.09-.87-.15-1.33-.15-1.4 0-2.69.49-3.71 1.29l2.32 3.56 2.72-4.7Z" />
  </Svg>
)

export default Icon
