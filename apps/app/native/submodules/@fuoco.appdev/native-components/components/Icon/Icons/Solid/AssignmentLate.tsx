import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M14.82 3H19c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h4.18C9.6 1.84 10.7 1 12 1c1.3 0 2.4.84 2.82 2ZM11 16v2h2v-2h-2Zm0-2V8h2v6h-2Zm0-10c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
