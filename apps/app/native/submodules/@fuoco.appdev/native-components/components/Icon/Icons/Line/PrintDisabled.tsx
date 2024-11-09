import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M2.23.82.82 2.23l5 4.99c-1.66 0-3 1.34-3 3v6h4v4h12l2.95 2.96 1.41-1.41L2.23.82Zm4.59 13.4h-2v-4c0-.55.45-1 1-1h2l3 3h-4v2Zm2 4v-4h4l4 4h-8Zm0-14h8v3h-5.34l2 2h6.34c.55 0 1 .45 1 1v4l-2 .01v-2.01h-2.34l4 4h2.34v-6c0-1.66-1.34-3-3-3h-1v-5h-12v.36l2 2v-.36Z" />
    <Path d="M18.82 11.73a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
  </Svg>
)

export default Icon
