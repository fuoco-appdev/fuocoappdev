import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M22 9 12 2 2 9h9v13h2V9h9ZM12 4.44 15.66 7H8.34L12 4.44Z" />
    <Path d="m4.14 12-1.96.37.82 4.37V22h2l.02-4H7v4h2v-6H4.9l-.76-4Z" />
    <Path d="M19.1 16H15v6h2v-4h1.98l.02 4h2v-5.26l.82-4.37-1.96-.37-.76 4Z" />
  </Svg>
)

export default Icon
