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
      d="M3 5H1c0-1.1.9-2 2-2v2ZM1 9h2V7H1v2Zm0 4h2v-2H1v2Zm8 8h2v-2H9v2Zm-6-4H1v-2h2v2Zm0 4v-2H1c0 1.1.9 2 2 2ZM13 3h8c1.1 0 2 .9 2 2v4H13V3Zm8 14h2v-2h-2v2ZM11 5H9V3h2v2ZM5 21h2v-2H5v2ZM7 5H5V3h2v2Zm14 16c1.1 0 2-.9 2-2h-2v2Zm2-8h-2v-2h2v2Zm-10 8h2v-2h-2v2Zm6 0h-2v-2h2v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
