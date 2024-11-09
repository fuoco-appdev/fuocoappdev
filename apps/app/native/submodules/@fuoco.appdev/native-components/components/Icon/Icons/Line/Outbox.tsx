import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M11 9.83V14h2V9.83l1.59 1.58L16 10l-4-4-4 4 1.41 1.41L11 9.83Z" />
    <Path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm0 16H5v-3h3.02c.91 1.21 2.35 2 3.98 2s3.06-.79 3.98-2H19v3Zm0-5h-4.18A2.99 2.99 0 0 1 12 16c-1.31 0-2.4-.84-2.82-2H5V5h14v9Z" />
  </Svg>
)

export default Icon
