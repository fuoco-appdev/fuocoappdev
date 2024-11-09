import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M1 9h2V7H1v2Zm0 4h2v-2H1v2Zm0-8h2V3c-1.1 0-2 .9-2 2Zm8 16h2v-2H9v2Zm-8-4h2v-2H1v2Zm2 4v-2H1c0 1.1.9 2 2 2ZM21 3h-8v6h10V5c0-1.1-.9-2-2-2Zm0 14h2v-2h-2v2ZM9 5h2V3H9v2ZM5 21h2v-2H5v2ZM5 5h2V3H5v2Zm16 16c1.1 0 2-.9 2-2h-2v2Zm0-8h2v-2h-2v2Zm-8 8h2v-2h-2v2Zm4 0h2v-2h-2v2Z" />
  </Svg>
)

export default Icon
