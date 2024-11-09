import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M9.68 13.19 12 11.43l2.31 1.76-.88-2.85 2.32-1.84h-2.84L12 5.69l-.91 2.81H8.25l2.31 1.84-.88 2.85ZM20 9.5c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 2.03.76 3.87 2 5.28v7.72l6-2 6 2v-7.72a7.96 7.96 0 0 0 2-5.28Zm-8-6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6Zm0 15-4 1.02v-3.1c1.18.68 2.54 1.08 4 1.08s2.82-.4 4-1.08v3.1l-4-1.02Z" />
  </Svg>
)

export default Icon
