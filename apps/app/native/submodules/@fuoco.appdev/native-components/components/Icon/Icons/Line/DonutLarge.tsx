import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M13.025 5.08a7 7 0 0 1 5.92 5.92h3.03c-.47-4.72-4.23-8.48-8.95-8.95v3.03Zm5.92 7.92a7 7 0 0 1-5.92 5.92v3.03c4.72-.47 8.48-4.23 8.95-8.95h-3.03Zm-7.92 5.92c-3.39-.49-6-3.4-6-6.92s2.61-6.43 6-6.92V2.05c-5.05.5-9 4.76-9 9.95 0 5.19 3.95 9.45 9 9.95v-3.03Z" />
  </Svg>
)

export default Icon
