import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M6 13.285c0-1.65.67-3.15 1.76-4.24l-1.42-1.42A8.015 8.015 0 0 0 4 13.285c0 4.08 3.05 7.44 7 7.93v-2.02c-2.83-.48-5-2.94-5-5.91Zm14 0c0-4.42-3.58-8-8-8-.06 0-.12.01-.18.01l1.09-1.09-1.41-1.42-3.5 3.5 3.5 3.5 1.41-1.41-1.08-1.08c.06 0 .12-.01.17-.01 3.31 0 6 2.69 6 6 0 2.97-2.17 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93Z" />
  </Svg>
)

export default Icon
