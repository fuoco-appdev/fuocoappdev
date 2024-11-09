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
      d="M3 5h2V3H3v2Zm2 4H3V7h2v2Zm0 4H3v-2h2v2Zm14 4h2v-2h-2v2Zm0 2h2v2h-2v-2ZM3 17h2v-2H3v2ZM9 5H7V3h2v2Zm4 16h-2v-2h2v2Zm-4 0H7v-2h2v2Zm-6 0h2v-2H3v2ZM16 3c2.76 0 5 2.24 5 5v5h-2V8c0-1.65-1.35-3-3-3h-5V3h5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
