import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20 6.5h-3v-2c0-1.11-.89-2-2-2H9c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2v-11c0-1.11-.89-2-2-2Zm-11-2h6v2H9v-2Zm11 15H4v-2h16v2Zm0-5H4v-6h3v2h2v-2h6v2h2v-2h3v6Z" />
  </Svg>
)

export default Icon
