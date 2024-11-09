import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m1.915.845-1.41 1.41 1 .99v11.91c0 1.1.89 2 1.99 2h7.01v2h-2v2h8v-2h-2v-2h.9l6 6 1.41-1.41-20.9-20.9Zm1.58 14.31v-9.91l9.91 9.91h-9.91Zm1.56-14 2 2h14.45v12h-2.45l2 2h.44c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2H5.055Z" />
  </Svg>
)

export default Icon
