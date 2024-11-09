import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M16 5c.67 0 1.27.33 1.63.84L22 12l-4.37 6.16c-.36.51-.96.84-1.63.84l-11-.01c-1.1 0-2-.89-2-1.99V7c0-1.1.9-1.99 2-1.99L16 5ZM5 17h11l3.55-5L16 7H5v10Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
