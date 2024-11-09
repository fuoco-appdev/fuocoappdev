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
      d="M10 19H6V5h4v14Zm4 0V5h4v14h-4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
