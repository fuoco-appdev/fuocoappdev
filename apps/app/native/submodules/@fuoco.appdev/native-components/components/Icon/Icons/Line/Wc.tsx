import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M5 22v-7.5H3.5V9c0-1.1.9-2 2-2h3c1.1 0 2 .9 2 2v5.5H9V22H5Zm12.5 0v-6h3l-2.54-7.63A2.01 2.01 0 0 0 16.06 7h-.12a2 2 0 0 0-1.9 1.37L11.5 16h3v6h3ZM7 6c1.11 0 2-.89 2-2 0-1.11-.89-2-2-2-1.11 0-2 .89-2 2 0 1.11.89 2 2 2Zm9 0c1.11 0 2-.89 2-2 0-1.11-.89-2-2-2-1.11 0-2 .89-2 2 0 1.11.89 2 2 2Z" />
  </Svg>
)

export default Icon
