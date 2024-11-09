import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 9.225c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2Zm0 8.55c-2.36-2.2-5.52-3.55-9-3.55v11c3.48 0 6.64 1.35 9 3.55 2.36-2.19 5.52-3.55 9-3.55v-11c-3.48 0-6.64 1.35-9 3.55Zm7 5.58c-2.53.34-4.93 1.3-7 2.82a15.2 15.2 0 0 0-7-2.83v-6.95c2.1.38 4.05 1.35 5.64 2.83l1.36 1.28 1.36-1.27a11.18 11.18 0 0 1 5.64-2.83v6.95Z" />
  </Svg>
)

export default Icon
