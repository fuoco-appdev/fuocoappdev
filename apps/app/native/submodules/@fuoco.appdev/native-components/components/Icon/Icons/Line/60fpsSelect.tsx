import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18 5v6h-3V5h3Zm0-2h-3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm-7 2V3H6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H6V5h5ZM9 9v2H6V9h3ZM5 21H3v-5h2v5Zm4 0H7v-5h2v5Zm4 0h-2v-5h2v5Zm8 0h-6v-5h6v5Z" />
  </Svg>
)

export default Icon
