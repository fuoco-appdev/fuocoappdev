import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M3 9.5H1v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2H3v-11Zm15-4v-2c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H5v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-11h-5Zm-6-2h4v2h-4v-2Zm9 13H7v-9h14v9Zm-9-1 5.5-4-5.5-3v7Z" />
  </Svg>
)

export default Icon
