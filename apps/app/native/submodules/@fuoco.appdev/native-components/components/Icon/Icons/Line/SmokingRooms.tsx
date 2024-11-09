import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18 17.5h1.5v3H18v-3Zm-16 0h15v3H2v-3Zm14.03-5.8H14.5c-1.02 0-1.85-.98-1.85-2s.83-1.75 1.85-1.75v-1.5a3.35 3.35 0 0 0 0 6.7h1.53c1.05 0 1.97.74 1.97 2.05v1.3h1.5v-1.64c0-1.81-1.6-3.16-3.47-3.16Zm4.47 5.8H22v3h-1.5v-3Zm-1.65-8.27c.62-.61 1-1.45 1-2.38 0-1.85-1.5-3.35-3.35-3.35V5c1.02 0 1.85.83 1.85 1.85S17.52 8.7 16.5 8.7v1.5c2.24 0 4 1.83 4 4.07v2.23H22v-2.24c0-2.22-1.28-4.14-3.15-5.03Z" />
  </Svg>
)

export default Icon
