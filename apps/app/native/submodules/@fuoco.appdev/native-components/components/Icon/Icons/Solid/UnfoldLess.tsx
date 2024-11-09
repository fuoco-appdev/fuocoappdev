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
      d="m15.17 4 1.42 1.41L12 10 7.41 5.41 8.83 4 12 7.17 15.17 4ZM8.83 20l-1.42-1.41L12 14l4.58 4.59L15.17 20 12 16.83 8.83 20Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
