import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M21 3.5H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-13c0-1.1-.9-2-2-2Zm0 15H3v-13h18v13ZM9 7.5h2v2H9v-2Zm-4 0h2v2H5v-2Zm3 8h8v1H8v-1Zm5-8h2v2h-2v-2Zm-4 4h2v2H9v-2Zm-4 0h2v2H5v-2Zm8 0h2v2h-2v-2Zm4-4h2v2h-2v-2Zm0 4h2v2h-2v-2Z" />
  </Svg>
)

export default Icon
