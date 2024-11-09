import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 9.8V4.5h-3v2.6l-4-3.6-10 9h3v8h6v-6h2v6h6v-8h3l-3-2.7Zm-2 8.7h-2v-6H9v6H7v-7.81l5-4.5 5 4.5v7.81Z" />
    <Path d="M10 10.5h4c0-1.1-.9-2-2-2s-2 .9-2 2Z" />
  </Svg>
)

export default Icon
