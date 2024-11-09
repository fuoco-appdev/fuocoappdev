import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M4.25 6h2v3h10V6h2v5h2V6c0-1.1-.9-2-2-2h-4.18c-.42-1.16-1.52-2-2.82-2-1.3 0-2.4.84-2.82 2H4.25c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h6v-2h-6V6Zm7-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1Z" />
    <Path d="M20.25 12.5 14.76 18l-3.01-3-1.5 1.5 4.51 4.5 6.99-7-1.5-1.5Z" />
  </Svg>
)

export default Icon
