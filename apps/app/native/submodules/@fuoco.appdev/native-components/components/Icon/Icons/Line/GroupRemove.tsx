import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M24 9v2h-6V9h6ZM8 4C5.79 4 4 5.79 4 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4Zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Zm0 3c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4Zm6 5H2v-.99C2.2 16.29 5.3 15 8 15s5.8 1.29 6 2v1ZM12.51 4.05A6.016 6.016 0 0 1 14 8c0 1.51-.57 2.89-1.49 3.95C14.47 11.7 16 10.04 16 8s-1.53-3.7-3.49-3.95Zm4.02 9.78C17.42 14.66 18 15.7 18 17v3h2v-3c0-1.45-1.59-2.51-3.47-3.17Z" />
  </Svg>
)

export default Icon
