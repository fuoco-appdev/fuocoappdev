import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M15 5v7H9V5h6Zm0-2H9c-1.1 0-2 .9-2 2v9h10V5c0-1.1-.9-2-2-2Zm7 7h-3v3h3v-3ZM5 10H2v3h3v-3Zm15 5H4v6h2v-4h12v4h2v-6Z" />
  </Svg>
)

export default Icon
