import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M21 5h2v14h-2V5Zm-4 0h2v14h-2V5Zm-3 0H2c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1Zm-1 12H3V7h10v10Z" />
    <Path d="M8 11.89a1.95 1.95 0 1 0 0-3.9 1.95 1.95 0 0 0 0 3.9Z" />
    <Path d="M11.89 15.35c0-1.3-2.59-1.95-3.89-1.95-1.3 0-3.89.65-3.89 1.95V16h7.78v-.65Z" />
  </Svg>
)

export default Icon
