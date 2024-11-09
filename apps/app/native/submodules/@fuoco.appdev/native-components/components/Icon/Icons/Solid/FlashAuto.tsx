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
      d="M3 2v12h3v9l7-12H9l4-9H3Zm16 0h-2l-3.2 9h1.9l.7-2h3.2l.7 2h1.9L19 2Zm-1 2-1.15 3.65h2.3L18 4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
