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
      d="M7 1h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2Zm0 16h14V3H7v14ZM3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5Zm14 6v2a2 2 0 0 1-2 2h-4v-2h4v-2h-4V5h6v2h-4v2h2a2 2 0 0 1 2 2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
