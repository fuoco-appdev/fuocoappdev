import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18.5 1h-10c-1.1 0-2 .9-2 2v3h2V4h10v16h-10v-2h-2v3c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2Zm-8.2 10V9.5C10.3 8.1 8.9 7 7.5 7S4.7 8.1 4.7 9.5V11c-.6 0-1.2.6-1.2 1.2v3.5c0 .7.6 1.3 1.2 1.3h5.5c.7 0 1.3-.6 1.3-1.2v-3.5c0-.7-.6-1.3-1.2-1.3ZM9 11H6V9.5c0-.8.7-1.3 1.5-1.3S9 8.7 9 9.5V11Z" />
  </Svg>
)

export default Icon