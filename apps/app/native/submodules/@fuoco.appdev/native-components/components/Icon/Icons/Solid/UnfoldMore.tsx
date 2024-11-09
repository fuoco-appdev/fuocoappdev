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
      d="M15.17 9 12 5.83 8.83 9 7.41 7.59 12 3l4.58 4.59L15.17 9Zm-6.34 6L12 18.17 15.17 15l1.42 1.41L12 21l-4.58-4.59L8.83 15Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
