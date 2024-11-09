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
      d="M2 20 12 4l10 16H2Zm16.39-2L12 7.77 5.61 18h12.78Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
