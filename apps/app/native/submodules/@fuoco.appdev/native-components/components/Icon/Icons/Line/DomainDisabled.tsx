import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m2.255.845-1.41 1.41 2 2v15.9h15.9l3 3 1.41-1.41-20.9-20.9Zm4.59 17.31h-2v-2h2v2Zm0-4h-2v-2h2v2Zm-2-4v-2h2v2h-2Zm6 8h-2v-2h2v2Zm-2-4v-2h2v2h-2Zm4 4v-2h1.9l2 2h-3.9Zm-4-14h2v2h-.45l2.45 2.45v-.45h8v8.45l2 2V6.155h-10v-4h-6.45l2.45 2.45v-.45Zm8 6h2v2h-2v-2Z" />
  </Svg>
)

export default Icon
