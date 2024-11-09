import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19.8 10.2 4.2 4.5l-.7 1.9 14.1 5.1H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V12c0-.8-.5-1.6-1.2-1.8Zm-.8 7.3H5v-4h14v4Zm-13-3h2v2H6v-2Zm4 0h8v2h-8v-2Z" />
  </Svg>
)

export default Icon
