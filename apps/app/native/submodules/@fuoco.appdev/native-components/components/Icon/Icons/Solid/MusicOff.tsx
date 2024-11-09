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
      d="m3 4.27 1.41-1.41 16.73 16.73L19.73 21 14 15.27v1.58c0 1.99-1.39 3.79-3.35 4.1a4.007 4.007 0 0 1-4.59-4.65c.24-1.4 1.27-2.59 2.61-3.07 1.23-.43 2.39-.22 3.33.32v-.28l-9-9ZM18 7h-4v2.61l-2-2V3h6v4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
