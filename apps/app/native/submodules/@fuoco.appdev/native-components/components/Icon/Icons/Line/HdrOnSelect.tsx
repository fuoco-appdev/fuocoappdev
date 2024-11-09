import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18 18.5v-1c0-.8-.7-1.5-1.5-1.5H13v6h1.5v-2h1.1l.9 2H18l-.9-2.1c.5-.3.9-.8.9-1.4Zm-1.5 0h-2v-1h2v1Zm-13-.5h-2v-2H0v6h1.5v-2.5h2V22H5v-6H3.5v2Zm6.5-2H6.5v6H10c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5Zm0 4.5H8v-3h2v3Zm14-.5h-2v2h-1.5v-2h-2v-1.5h2v-2H22v2h2V20ZM12 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4Zm0-2C8.69 2 6 4.69 6 8s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6Z" />
  </Svg>
)

export default Icon
