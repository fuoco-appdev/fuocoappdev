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
      d="M3 3.01h18a2 2 0 0 1 2 2v14c0 1.1-.9 1.98-2 1.98H3c-1.1 0-2-.88-2-1.98V15h2v4.02h18V4.99H3V9H1V5.01c0-1.1.9-2 2-2ZM15 12l-4 4v-3H1v-2h10V8l4 4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
