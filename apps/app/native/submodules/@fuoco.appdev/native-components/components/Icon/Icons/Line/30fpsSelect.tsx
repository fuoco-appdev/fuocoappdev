import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M4 3v2h5v2H5v2h4v2H4v2h5c1.1 0 2-.9 2-2V9.5c0-.83-.17-1.5-1-1.5.83 0 1-.67 1-1.5V5c0-1.1-.9-2-2-2H4Zm14 0c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2h-3c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h3Zm0 2h-3v6h3V5ZM5 21H3v-5h2v5Zm4 0H7v-5h2v5Zm4 0h-2v-5h2v5Zm8 0h-6v-5h6v5Z" />
  </Svg>
)

export default Icon
