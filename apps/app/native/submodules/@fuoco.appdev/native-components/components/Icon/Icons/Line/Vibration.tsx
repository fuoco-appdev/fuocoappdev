import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M0 15h2V9H0v6Zm3 2h2V7H3v10Zm19-8v6h2V9h-2Zm-3 8h2V7h-2v10ZM16.5 3h-9C6.67 3 6 3.67 6 4.5v15c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-15c0-.83-.67-1.5-1.5-1.5ZM16 19H8V5h8v14Z" />
  </Svg>
)

export default Icon
