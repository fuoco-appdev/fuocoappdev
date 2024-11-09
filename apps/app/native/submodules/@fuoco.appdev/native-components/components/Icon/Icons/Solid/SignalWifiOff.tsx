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
      d="m2 2.72 1.41-1.41 17.23 17.23-1.41 1.41-3.32-3.32L12 21.5.36 7l.025-.02c.29-.227 1.593-1.252 3.665-2.21L2 2.72Zm21.574 4.229L23.64 7l-5.21 6.5L8.31 3.38C9.45 3.14 10.68 3 12 3c6.462 0 10.856 3.394 11.574 3.949Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
