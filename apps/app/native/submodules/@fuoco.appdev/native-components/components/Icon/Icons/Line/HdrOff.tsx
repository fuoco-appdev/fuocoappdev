import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17.995 14.455v-2h1.1l.9 2h1.5l-.9-2.1c.5-.3.9-.8.9-1.4v-1c0-.8-.7-1.5-1.5-1.5h-3.5v4.86l1.14 1.14h.36Zm0-4.5h2v1h-2v-1Zm-4.5 0v.36l1.5 1.5v-1.86c0-.8-.7-1.5-1.5-1.5h-1.86l1.5 1.5h.36Zm-10.49-8.01-1.06 1.06 5.45 5.45h-.4v2h-2v-2h-1.5v6h1.5v-2.5h2v2.5h1.5v-4.9l1.5 1.5v3.4h3.4l7.6 7.6 1.06-1.06-19.05-19.05Z" />
  </Svg>
)

export default Icon
