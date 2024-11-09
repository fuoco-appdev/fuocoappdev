import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M10.66 8.89 11.6 12h2.82l-2.27 1.62.93 3.01-2.42-1.84-2.42 1.84.93-3.01L6.9 12h2.82l.94-3.11ZM8.24 10H.66l6.17 4.41L4.49 22l6.17-4.69L16.84 22l-2.35-7.59L20.66 10h-7.58l-2.42-8-2.42 8Zm12.78 12-1.86-6.01L23.34 13H19.9l-3.08 2.2 1.46 4.72L21.02 22ZM16.66 8l-1.82-6-1.04 3.45.77 2.55h2.09Z" />
  </Svg>
)

export default Icon
