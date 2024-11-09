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
      d="M9 1h10c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2v-3h2v2h10V4H9v2H7V3c0-1.1.9-2 2-2Zm3 6.2 1 1-4 4 4 4-1 1-4-4-4 4-1-1 4-4-4-4 1-1 4 4 4-4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
