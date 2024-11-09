import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M3 9.5H1v11c0 1.11.89 2 2 2h16v-2H3v-11Z" />
    <Path d="M18 5.5v-2c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H5v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-11h-5Zm-6-2h4v2h-4v-2Zm9 13H7v-9h14v9Z" />
    <Path d="M12 8.5v7l5.5-3.5L12 8.5Z" />
  </Svg>
)

export default Icon
