import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M6.26 9h-3.5v6h1.5v-2h1.1l.9 2h1.5l-.9-2.1c.5-.3.9-.8.9-1.4v-1c0-.8-.7-1.5-1.5-1.5Zm0 2.5h-2v-1h2v1Z" />
    <Path d="m10.01 9-1.5 6h1.5l.38-1.5h1.75l.37 1.5h1.5l-1.5-6h-2.5Zm.75 3 .25-1h.5l.25 1h-1Z" />
    <Path d="M19.74 9 19 12l-.74-3h-1.52L16 12l-.74-3h-1.5l1.5 6h1.48l.76-3.04.76 3.04h1.48l1.5-6h-1.5Z" />
  </Svg>
)

export default Icon
