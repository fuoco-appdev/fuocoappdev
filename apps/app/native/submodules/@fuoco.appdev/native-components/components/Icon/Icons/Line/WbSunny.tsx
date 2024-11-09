import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m6.76 5.34-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41ZM1 11h3v2H1v-2Zm10-9.95h2V4h-2V1.05Zm8.04 2.495 1.408 1.407-1.79 1.79-1.407-1.408 1.789-1.789Zm-1.8 15.115 1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4ZM20 11h3v2h-3v-2Zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6Zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4Zm-1 4h2v2.95h-2V20Zm-7.45-.96 1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8Z" />
  </Svg>
)

export default Icon
