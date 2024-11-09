import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 6.5h-1v-5H6v5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2Zm-11-3h8v3H8v-3Zm11 17H5v-12h14v12Z" />
    <Path d="M12 9.5c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5Zm0 8.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 11 12 11s3.5 1.57 3.5 3.5S13.93 18 12 18Z" />
    <Path d="M12.5 12h-1v2.71l1.64 1.64.71-.71-1.35-1.35V12Z" />
  </Svg>
)

export default Icon
