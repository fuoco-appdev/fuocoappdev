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
      d="M5 3h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2Zm14 16H5V5h14v14Zm-6-2h-2V7h2v10Zm-4 0H7v-7h2v7Zm6 0h2v-4h-2v4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
