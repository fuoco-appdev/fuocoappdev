import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17.79 13v7h-14V6h5.02c.05-.71.22-1.38.48-2h-5.5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5l-2-2Zm-1.5 5h-11l2.75-3.53L10 16.83l2.75-3.54L16.29 18Zm2.8-9.11c.44-.7.7-1.51.7-2.39 0-2.49-2.01-4.5-4.5-4.5s-4.5 2.01-4.5 4.5S12.8 11 15.28 11c.88 0 1.7-.26 2.39-.7l3.12 3.12L22.21 12l-3.12-3.11Zm-3.8.11a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5Z" />
  </Svg>
)

export default Icon
