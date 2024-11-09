import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17 6.68V2.5h-2v4.18c-1.16.42-2 1.52-2 2.82 0 1.3.84 2.4 2 2.82v3.18c0 2.21-1.79 4-4 4s-4-1.79-4-4v-1.17l1.59 1.59L10 14.5l-5-5v6c0 3.31 2.69 6 6 6s6-2.69 6-6v-3.18c1.16-.41 2-1.51 2-2.82 0-1.31-.84-2.4-2-2.82Zm-1 3.82c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Z" />
  </Svg>
)

export default Icon
