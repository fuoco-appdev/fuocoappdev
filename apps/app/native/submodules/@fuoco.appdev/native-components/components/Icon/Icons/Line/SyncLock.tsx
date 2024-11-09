import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M9.5 3.26v2.09c-2.33.83-4 3.04-4 5.65 0 1.77.78 3.34 2 4.44V13h2v6h-6v-2h2.73a7.942 7.942 0 0 1-2.73-6c0-3.73 2.55-6.85 6-7.74Zm10-.26h-6v6h2V6.56c1.22 1.1 2 2.67 2 4.44h2c0-2.4-1.06-4.54-2.73-6h2.73V3Zm0 13v-1c0-1.1-.9-2-2-2s-2 .9-2 2v1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1Zm-1 0h-2v-1c0-.55.45-1 1-1s1 .45 1 1v1Z" />
  </Svg>
)

export default Icon
