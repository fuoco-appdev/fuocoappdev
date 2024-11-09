import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M8 9.5h8v2H8v-2Zm12.1 1H22c0-2.76-2.24-5-5-5h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1Zm-16.2 0c0-1.71 1.39-3.1 3.1-3.1h4V5.5H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1Zm15.1 0h-2v3h-3v2h3v3h2v-3h3v-2h-3v-3Z" />
  </Svg>
)

export default Icon
