import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M10.995 21h-1l1-7h-3.5c-.88 0-.33-.75-.31-.78 1.29-2.28 3.23-5.68 5.82-10.22h1l-1 7h3.51c.4 0 .62.19.4.66-3.95 6.89-5.92 10.34-5.92 10.34Z" />
  </Svg>
)

export default Icon
