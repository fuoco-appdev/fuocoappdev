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
      d="M11 7h8c2.21 0 4 1.79 4 4v9h-2v-3H3v3H1V5h2v9h8V7Zm-1 3c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
