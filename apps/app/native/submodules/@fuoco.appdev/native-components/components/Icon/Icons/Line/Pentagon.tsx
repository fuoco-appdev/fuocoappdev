import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m19.63 10.28-3.07 9.22H7.44l-3.07-9.22L12 4.94l7.63 5.34ZM2 9.5l4 12h12l4-12-10-7-10 7Z" />
  </Svg>
)

export default Icon
