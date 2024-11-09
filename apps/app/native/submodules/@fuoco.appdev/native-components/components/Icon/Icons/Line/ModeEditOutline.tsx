import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M2.999 21.001h3.75l11.06-11.06-3.75-3.75-11.06 11.06v3.75Zm2-2.92 9.06-9.06.92.92-9.06 9.06h-.92v-.92Z" />
    <Path d="M18.369 3.291a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 0 0 0-1.41l-2.34-2.34Z" />
  </Svg>
)

export default Icon
