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
      d="M9 9h2V2h2v7c0 2.21-1.79 4-4 4v9H7v-9c-2.21 0-4-1.79-4-4V2h2v7h2V2h2v7Zm7 5V6c0-1.76 2.24-4 5-4v20h-2v-8h-3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
