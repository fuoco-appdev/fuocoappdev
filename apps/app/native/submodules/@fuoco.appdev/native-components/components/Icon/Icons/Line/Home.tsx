import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m12 6.19 5 4.5v7.81h-2v-6H9v6H7v-7.81l5-4.5Zm0-2.69-10 9h3v8h6v-6h2v6h6v-8h3l-10-9Z" />
  </Svg>
)

export default Icon
