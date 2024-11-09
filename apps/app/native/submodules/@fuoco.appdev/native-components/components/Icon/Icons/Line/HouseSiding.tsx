import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 12.5h3l-10-9-10 9h3v8h2v-2h10v2h2v-8Zm-11.79-2h9.58l.21.19v1.81H7v-1.81l.21-.19Zm7.36-2H9.43L12 6.19l2.57 2.31ZM7 16.5v-2h10v2H7Z" />
  </Svg>
)

export default Icon
