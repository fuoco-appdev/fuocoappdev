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
      d="M11 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm-2 5 3-2.94a9.34 9.34 0 0 0-1-.06c-2.67 0-8 1.34-8 4v2h9l-3-3Zm3 0 3.47 3.5L22 13.91l-1.4-1.41-5.13 5.17-2.07-2.08L12 17Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
