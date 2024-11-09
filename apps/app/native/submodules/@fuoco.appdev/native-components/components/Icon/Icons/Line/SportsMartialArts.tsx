import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m19.8 2.5-8.2 6.7-1.21-1.04 3.6-2.08L9.41 1.5 8 2.91l2.74 2.74L5 8.96l-1.19 4.29 2.46 4.25 1.73-1-2.03-3.52.35-1.3L9.5 13.5l.5 9h2l.5-10L21 3.9l-1.2-1.4Z" />
    <Path d="M5 7.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
  </Svg>
)

export default Icon
