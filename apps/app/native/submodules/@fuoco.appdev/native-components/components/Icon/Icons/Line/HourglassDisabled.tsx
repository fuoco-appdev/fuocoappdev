import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M8.705 3.34h8v3.5l-2.84 2.84 1.25 1.25 3.59-3.58-.01-.01h.01v-6h-12v1.17l2 2V3.34Z" />
    <Path d="m2.805 1.44-1.41 1.41 8.9 8.9-3.59 3.59.01.01h-.01v5.99h12v-1.17l2.49 2.49 1.41-1.41-19.8-19.81Zm13.9 17.9h-8v-3.5l2.84-2.84 5.16 5.17v1.17Z" />
  </Svg>
)

export default Icon
