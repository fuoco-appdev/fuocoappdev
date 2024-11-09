import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M5.035 21.501h16V5.471l-16 16.03Zm14-2h-2v-7.22l2-2v9.22ZM4.255 6.721l-1.29-1.29c3.9-3.91 10.24-3.91 14.15 0l-1.29 1.29c-3.19-3.19-8.38-3.19-11.57 0Zm7.71 3.85-1.93 1.93-1.93-1.93a2.74 2.74 0 0 1 3.86 0Zm1.29-1.28c-1.78-1.77-4.66-1.77-6.43 0l-1.29-1.29a6.374 6.374 0 0 1 9 0l-1.28 1.29Z" />
  </Svg>
)

export default Icon
