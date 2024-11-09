import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M21 6h-2.64l1.14-3.14L17.15 2l-1.46 4H3v2l2 6-2 6v2h18v-2l-2-6 2-6V6Zm-2.11 14H5.11l2-6-2-6h13.78l-2 6 2 6ZM13 10h-2v3H8v2h3v3h2v-3h3v-2h-3v-3Z" />
  </Svg>
)

export default Icon
