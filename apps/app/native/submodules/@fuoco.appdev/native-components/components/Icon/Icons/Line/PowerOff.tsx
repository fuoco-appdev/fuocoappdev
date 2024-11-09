import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M10.215 2.505h-2v1.88l2 2v-3.88Zm6 6v3.88l1.8 1.8.2-.2v-5.48c0-1.1-.9-2-2-2v-4h-2v4h-3.88l2 2h3.88Zm-11.88-5.16-1.41 1.41 3.29 3.29v5.96l3.5 3.5v3h5v-3l.48-.48 4.47 4.47 1.41-1.41-16.74-16.74Zm8.38 13.33v1.83h-1v-1.83l-3.5-3.52v-3.11l5.57 5.57-1.07 1.06Z" />
  </Svg>
)

export default Icon
