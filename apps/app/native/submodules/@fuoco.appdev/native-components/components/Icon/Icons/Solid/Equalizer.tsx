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
      d="M10 20h4V4h-4v16Zm-6 0h4v-8H4v8Zm12 0V9h4v11h-4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
