import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 3H5c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2ZM5 10h3.13c.21.78.67 1.47 1.27 2H5v-2Zm14 2h-4.4c.6-.53 1.06-1.22 1.27-2H19v2Zm0-4h-5v1c0 1.07-.93 2-2 2-1.07 0-2-.93-2-2V8H5V5h14v3Zm-5 7v1c0 .47-.19.9-.48 1.25-.37.45-.92.75-1.52.75s-1.15-.3-1.52-.75c-.29-.35-.48-.78-.48-1.25v-1H3v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4h-7Zm-9 2h3.13c.02.09.06.17.09.25.24.68.65 1.28 1.18 1.75H5v-2Zm14 2h-4.4c.54-.47.95-1.07 1.18-1.75.03-.08.07-.16.09-.25H19v2Z" />
  </Svg>
)

export default Icon
