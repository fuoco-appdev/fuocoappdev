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
      d="M17 8h3l3 4v5h-2c0 1.66-1.34 3-3 3s-3-1.34-3-3H9c0 1.66-1.34 3-3 3s-3-1.34-3-3H1V6c0-1.1.9-2 2-2h14v4ZM5 17c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1Zm14.5-7.5 1.96 2.5H17V9.5h2.5ZM17 17c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
