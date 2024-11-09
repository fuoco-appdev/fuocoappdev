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
      d="M10.18 12 5.59 7.41 7 6l6 6-6 6-1.41-1.41L10.18 12ZM18 6h-2v12h2V6Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
