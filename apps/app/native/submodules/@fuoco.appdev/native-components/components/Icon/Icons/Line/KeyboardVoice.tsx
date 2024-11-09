import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 14.5c1.66 0 2.99-1.34 2.99-3l.01-6c0-1.66-1.34-3-3-3s-3 1.34-3 3v6c0 1.66 1.34 3 3 3Zm-1.2-9.1c0-.66.54-1.2 1.2-1.2.66 0 1.2.54 1.2 1.2l-.01 6.2c0 .66-.53 1.2-1.19 1.2-.66 0-1.2-.54-1.2-1.2V5.4Zm6.5 6.1c0 3-2.54 5.1-5.3 5.1s-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72v3.28h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7Z" />
  </Svg>
)

export default Icon
