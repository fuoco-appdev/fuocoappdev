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
      d="M5 3v9c0 1.66 1.34 3 3 3h4v2H8c-2.76 0-5-2.24-5-5V3h2Zm13.5 18c.92 0 1.65-.84 1.47-1.8-.14-.71-.8-1.2-1.53-1.2H17l2-7c0-1.1-.9-2-2-2h-5V3H6v8c0 1.65 1.35 3 3 3h6l-1 4v3h4.5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
