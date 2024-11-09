import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M4.995 15h14V9h-14v6Zm2-4h10v2h-10v-2Zm4-10h2v3h-2V1Zm9.46 4.01-1.42-1.41-1.79 1.79 1.41 1.41 1.8-1.79ZM10.995 20h2v3h-2v-3Zm6.24-1.29 1.79 1.8 1.42-1.42-1.8-1.79-1.41 1.41ZM4.955 3.595l1.788 1.79L5.335 6.79 3.548 5.003l1.407-1.408ZM3.545 19.08l1.41 1.42 1.79-1.8-1.41-1.41-1.79 1.79Z" />
  </Svg>
)

export default Icon
