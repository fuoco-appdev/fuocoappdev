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
      d="M15 3h-2v2h2V3Zm8 8h-2v2h2v-2Zm0 4h-2v2h2v-2Zm-2 4h2c0 1-1 2-2 2v-2Zm0-12h2v2h-2V7Zm0-4v2h2c0-1-1-2-2-2ZM11 15v6H3c-1.1 0-2-.9-2-2v-4h10ZM3 7H1v2h2V7Zm10 12h2v2h-2v-2Zm6-16h-2v2h2V3Zm-2 16h2v2h-2v-2ZM3 3C2 3 1 4 1 5h2V3Zm-2 8h2v2H1v-2Zm10-8H9v2h2V3ZM5 3h2v2H5V3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
