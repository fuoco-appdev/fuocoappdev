import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 4h-4.18C14.4 2.84 13.3 2 12 2c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75ZM19 20H5V6h14v14Z" />
    <Path d="m15.08 12.03-2.12-2.12L7 15.86V18h2.1l5.98-5.97Z" />
    <Path d="M16.85 10.27c.2-.2.2-.51 0-.71l-1.41-1.41c-.2-.2-.51-.2-.71 0l-1.06 1.06 2.12 2.12 1.06-1.06Z" />
  </Svg>
)

export default Icon
