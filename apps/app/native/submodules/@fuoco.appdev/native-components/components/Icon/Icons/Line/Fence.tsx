import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M21 12v-2h-2V7l-3-3-2 2-2-2-2 2-2-2-3 3v3H3v2h2v2H3v2h2v4h14v-4h2v-2h-2v-2h2Zm-5-5.17 1 1V10h-2V7.83l1-1Zm-4 0 1 1V10h-2V7.83l1-1ZM11 14v-2h2v2h-2Zm2 2v2h-2v-2h2ZM7 7.83l1-1 1 1V10H7V7.83ZM7 12h2v2H7v-2Zm0 4h2v2H7v-2Zm10 2h-2v-2h2v2Zm0-4h-2v-2h2v2Z" />
  </Svg>
)

export default Icon
