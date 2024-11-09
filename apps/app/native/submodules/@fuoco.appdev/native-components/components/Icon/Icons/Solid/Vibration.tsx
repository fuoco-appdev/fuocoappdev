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
      d="M16.5 3h-9C6.67 3 6 3.67 6 4.5v15c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-15c0-.83-.67-1.5-1.5-1.5ZM5 17H3V7h2v10Zm-3-2H0V9h2v6Zm20-6v6h2V9h-2Zm-1 8h-2V7h2v10ZM8 19h8V5H8v14Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
