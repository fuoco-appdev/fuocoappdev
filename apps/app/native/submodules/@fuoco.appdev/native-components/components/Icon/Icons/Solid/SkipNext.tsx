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
      d="M14.5 12 6 18V6l8.5 6Zm3.5 6h-2V6h2v12Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
