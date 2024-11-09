import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20 3H4c-1.11 0-1.99.89-1.99 2L2 17c0 1.11.89 2 2 2h5v-2H4v-6h18V5c0-1.11-.89-2-2-2Zm0 4H4V5h16v2Zm-5.07 11.17-2.83-2.83-1.41 1.41L14.93 21 22 13.93l-1.41-1.41-5.66 5.65Z" />
  </Svg>
)

export default Icon
