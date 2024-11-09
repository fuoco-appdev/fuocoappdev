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
      d="M22 4h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2ZM2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6Zm9.5 3L7 15h14l-3.5-4.5-2.5 3.01L11.5 9Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
