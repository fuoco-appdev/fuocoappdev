import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M16.5 11c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5Zm1.65 7.35L16 16.2V13h1v2.79l1.85 1.85-.7.71Z" />
    <Path d="m10.5 11-6-1.5V6.01l8.87 3.74c.94-.47 2-.75 3.13-.75.1 0 .19.01.28.01L2.5 3v16l7-2.95V16c0-.8.14-1.56.39-2.28L4.5 15.99V12.5l6-1.5Z" />
  </Svg>
)

export default Icon
