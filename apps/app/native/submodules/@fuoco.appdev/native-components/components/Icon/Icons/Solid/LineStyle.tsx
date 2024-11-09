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
      d="M3 8V4h18v4H3Zm8 4H3v-2h8v2Zm-8 4h5v-2H3v2Zm6.5 0h5v-2h-5v2ZM21 16h-5v-2h5v2ZM3 20h2v-2H3v2Zm6-2v2H7v-2h2Zm2 2h2v-2h-2v2Zm6-2v2h-2v-2h2Zm2 2h2v-2h-2v2Zm-6-8h8v-2h-8v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
