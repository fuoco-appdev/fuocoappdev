import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20.5 4c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 6c1.86.5 4 .83 6 1v12h2v-6h2v6h2V7c2-.17 4.14-.5 6-1l-.5-2ZM12 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2ZM7 24h2v-2H7v2Zm4 0h2v-2h-2v2Zm4 0h2v-2h-2v2Z" />
  </Svg>
)

export default Icon
