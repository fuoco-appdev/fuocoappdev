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
      d="M2 22 22 2v20H2Zm18-2V6.83L6.83 20H20Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
