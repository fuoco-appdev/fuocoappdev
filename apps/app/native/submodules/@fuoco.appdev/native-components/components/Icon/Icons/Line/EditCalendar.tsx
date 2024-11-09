import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M3.934 9.5h14v2h2v-6c0-1.1-.9-2-2-2h-1v-2h-2v2h-8v-2h-2v2h-1c-1.11 0-1.99.9-1.99 2l-.01 14a2 2 0 0 0 2 2h7v-2h-7v-10Zm0-4h14v2h-14v-2Zm17.84 10.28-.71.71-2.12-2.12.71-.71a.996.996 0 0 1 1.41 0l.71.71c.39.39.39 1.02 0 1.41Zm-3.54-.7 2.12 2.12-5.3 5.3h-2.12v-2.12l5.3-5.3Z" />
  </Svg>
)

export default Icon
