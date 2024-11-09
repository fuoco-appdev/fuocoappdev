import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 7H9c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2Zm0 2v2H9V9h10Zm-6 6v-2h2v2h-2Zm2 2v2h-2v-2h2Zm-4-2H9v-2h2v2Zm6-2h2v2h-2v-2Zm-8 4h2v2H9v-2Zm8 2v-2h2v2h-2ZM6 17H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v1h-2V5H5v10h1v2Z" />
  </Svg>
)

export default Icon
