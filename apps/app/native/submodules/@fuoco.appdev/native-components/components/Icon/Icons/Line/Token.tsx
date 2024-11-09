import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m21 7-9-5-9 5v10l9 5 9-5V7Zm-9-2.71 5.91 3.28-3.01 1.67A4.016 4.016 0 0 0 12 8c-1.14 0-2.17.48-2.9 1.24L6.09 7.57 12 4.29Zm-1 14.87-6-3.33V9.26L8.13 11c-.09.31-.13.65-.13 1 0 1.86 1.27 3.43 3 3.87v3.29ZM10 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2Zm3 7.16v-3.28c1.73-.44 3-2.01 3-3.87 0-.35-.04-.69-.13-1.01L19 9.26v6.57l-6 3.33Z" />
  </Svg>
)

export default Icon
