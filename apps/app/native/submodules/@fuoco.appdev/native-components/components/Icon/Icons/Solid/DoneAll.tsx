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
      d="M22.24 5.59 11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41ZM18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7ZM6 19 .41 13.41 1.83 12l5.58 5.59L6 19Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
