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
      d="M22 6v4c-1.1 0-2 .9-2 2s.9 2 2 2v4c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-4a2 2 0 0 0 2-2c0-1.1-.89-2-1.99-2V6c0-1.11.89-2 1.99-2h16a2 2 0 0 1 2 2ZM11 17.5h2v-2h-2v2Zm2-4.5h-2v-2h2v2Zm-2-4.5h2v-2h-2v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
