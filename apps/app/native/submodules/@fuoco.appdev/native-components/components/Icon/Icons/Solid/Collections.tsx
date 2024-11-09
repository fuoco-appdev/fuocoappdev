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
      d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2Zm-11-4 2.03 2.71L16 11l4 5H8l3-4Zm-9 8V6h2v14h14v2H4c-1.1 0-2-.9-2-2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
