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
      d="M11 7h8c2.21 0 4 1.79 4 4v6H1V7h2v7h8V7Zm-1 3c0 1.65-1.35 3-3 3s-3-1.35-3-3 1.35-3 3-3 3 1.35 3 3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
