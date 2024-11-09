import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M8.565 3.425v.89l2 2v-2.89h4v4h-2.89l2 2h.89v.89l2 2v-2.89h4v4h-2.89l2 2h.89v.89l2 2V3.425c0-1.1-.9-2-2-2H5.675l2 2h.89Zm8 0h4v4h-4v-4ZM1.975.565l-1.41 1.41 2 2v15.45c0 1.1.9 2 2 2h15.45l2.01 2.01 1.41-1.41L1.975.565Zm8.59 11.41 1.45 1.45h-1.45v-1.45Zm-6-6 1.45 1.45h-1.45v-1.45Zm4 13.45h-4v-4h4v4Zm0-6h-4v-4h3.45l.55.55v3.45Zm6 6h-4v-4h3.45l.55.55v3.45Zm2 0v-1.45l1.45 1.45h-1.45Z" />
  </Svg>
)

export default Icon
