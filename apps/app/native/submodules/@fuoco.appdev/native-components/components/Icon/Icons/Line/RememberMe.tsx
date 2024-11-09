import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2Zm0 20H7v-1h10v1Zm0-3H7v-.48A8.97 8.97 0 0 1 12 16c1.78 0 3.53.53 5 1.52V18Zm0-2.79c-1.5-.77-3.2-1.21-5-1.21-1.8 0-3.5.44-5 1.21V6h10v9.21ZM17 4H7V3h10v1Z" />
    <Path d="M12 13c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3Zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1Z" />
  </Svg>
)

export default Icon
