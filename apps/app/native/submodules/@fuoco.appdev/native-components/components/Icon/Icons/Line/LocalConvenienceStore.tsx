import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 7V4H5v3H2v13h8v-4h4v4h8V7h-3Zm1 11h-4v-4H8v4H4V9h3V6h10v3h3v9ZM8 8h2v1H8v3h3v-1H9v-1h2V7H8v1Zm7 1h-1V7h-1v3h2v2h1V7h-1v2Z" />
  </Svg>
)

export default Icon
