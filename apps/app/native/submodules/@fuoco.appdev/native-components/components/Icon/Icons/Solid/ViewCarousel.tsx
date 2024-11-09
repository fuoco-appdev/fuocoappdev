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
      d="M7 19h10V4H7v15Zm-5-2h4V6H2v11Zm16 0V6h4v11h-4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
