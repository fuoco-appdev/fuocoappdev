import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M16.25 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02a4.5 4.5 0 0 0-2.5-4.03ZM5.25 9v6h4l5 5V4l-5 5h-4Zm7-.17v6.34L10.08 13H7.25v-2h2.83l2.17-2.17Z" />
  </Svg>
)

export default Icon
