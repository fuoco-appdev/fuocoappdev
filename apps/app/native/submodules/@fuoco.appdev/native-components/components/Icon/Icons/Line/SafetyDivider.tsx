import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M11 5h2v14h-2V5Zm-6 7c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Zm2.78 1.58a6.95 6.95 0 0 0-5.56 0A2.01 2.01 0 0 0 1 15.43V16h8v-.57c0-.81-.48-1.53-1.22-1.85ZM19 12c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Zm2.78 1.58a6.95 6.95 0 0 0-5.56 0A2.01 2.01 0 0 0 15 15.43V16h8v-.57c0-.81-.48-1.53-1.22-1.85Z" />
  </Svg>
)

export default Icon
