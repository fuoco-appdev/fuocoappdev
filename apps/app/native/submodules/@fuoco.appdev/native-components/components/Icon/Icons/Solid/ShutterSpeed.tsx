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
      d="M15 1H9v2h6V1Zm4.03 6.39 1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4a9 9 0 0 0-9 9c0 4.97 4.02 9 9 9a8.994 8.994 0 0 0 7.03-14.61ZM5 13c0 3.87 3.13 7 7 7s7-3.13 7-7-3.13-7-7-7-7 3.13-7 7Zm6.68 2H6.35a5.992 5.992 0 0 0 3.41 3.56l-.11-.06 2.03-3.5Zm2.63-7.54c1.56.65 2.77 1.94 3.34 3.54h-5.39l2.05-3.54Zm-3.7 11.37c.45.11.91.17 1.39.17 1.34 0 2.57-.45 3.57-1.19l-2.11-3.9-2.85 4.92ZM6 13c0-1.54.59-2.95 1.55-4.01L10.81 14H6.09c-.05-.33-.09-.66-.09-1Zm10.34 4.13A5.94 5.94 0 0 0 18 13c0-.34-.04-.67-.09-1h-4.34l2.77 5.13ZM12 7c.46 0 .9.06 1.33.15l-2.72 4.7-2.32-3.56C9.31 7.49 10.6 7 12 7Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon