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
      d="M5 3h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2Zm8.5 2H12v6h1.5V8l2 3h1.7l-2-3 2-3h-1.7l-2 3V5ZM7 7.25h2.5V6.5H7V5h4v3.75H8.5v.75H11V11H7V7.25ZM13 19l6-6v-2.5l-6 6-4-4-4 4V19l4-4 4 4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
