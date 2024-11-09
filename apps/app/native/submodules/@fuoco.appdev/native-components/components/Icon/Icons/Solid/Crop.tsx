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
      d="M7 1v16h16v2h-4v4h-2v-4H7c-1.1 0-2-.9-2-2V7H1V5h4V1h2Zm12 14h-2V7H9V5h8c1.1 0 2 .9 2 2v8Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
