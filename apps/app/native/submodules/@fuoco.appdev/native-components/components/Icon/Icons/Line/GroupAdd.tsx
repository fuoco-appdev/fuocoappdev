import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M22 9V7h-2v2h-2v2h2v2h2v-2h2V9h-2Z" />
    <Path d="M8 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2Z" />
    <Path d="M8 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4Zm6 5H2v-.99C2.2 16.29 5.3 15 8 15s5.8 1.29 6 2v1Z" />
    <Path d="M12.51 4.05A6.016 6.016 0 0 1 14 8c0 1.51-.57 2.89-1.49 3.95C14.47 11.7 16 10.04 16 8s-1.53-3.7-3.49-3.95Z" />
    <Path d="M16.53 13.83C17.42 14.66 18 15.7 18 17v3h2v-3c0-1.45-1.59-2.51-3.47-3.17Z" />
  </Svg>
)

export default Icon
