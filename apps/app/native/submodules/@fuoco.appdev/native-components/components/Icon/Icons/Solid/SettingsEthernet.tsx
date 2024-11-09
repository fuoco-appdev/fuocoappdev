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
      d="M7.77 6.76 6.23 5.48.82 12l5.41 6.52 1.54-1.28L3.42 12l4.35-5.24ZM7 13h2v-2H7v2Zm8-2h2v2h-2v-2Zm-4 2h2v-2h-2v2Zm5.23-6.24 1.54-1.28L23.18 12l-5.41 6.52-1.54-1.28L20.58 12l-4.35-5.24Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
