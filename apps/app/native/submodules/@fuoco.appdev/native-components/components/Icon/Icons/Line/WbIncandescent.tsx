import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m3.55 18.565 1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8Zm7.45.91h2v3h-2v-3Zm-10-9h3v2H1v-2Zm12-6.95v3.96l1 .58c1.24.72 2 2.04 2 3.46 0 2.21-1.79 4-4 4s-4-1.79-4-4c0-1.42.77-2.74 2-3.46l1-.58v-3.96h2Zm2-2H9v4.81c-1.79 1.04-3 2.97-3 5.19 0 3.31 2.69 6 6 6s6-2.69 6-6c0-2.22-1.21-4.15-3-5.19v-4.81Zm5 8.95h3v2h-3v-2Zm-2.76 7.71 1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4Z" />
  </Svg>
)

export default Icon
