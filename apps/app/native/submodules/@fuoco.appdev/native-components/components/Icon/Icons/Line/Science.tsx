import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M13 11.33 18 18H6l5-6.67V6h2v5.33ZM15.96 4H8.04c-.42 0-.65.48-.39.81L9 6.5v4.17L3.2 18.4c-.49.66-.02 1.6.8 1.6h16c.82 0 1.29-.94.8-1.6L15 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81Z" />
  </Svg>
)

export default Icon
