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
      d="M8 6H6v12h2V6Zm5.82 6 4.59 4.59L17 18l-6-6 6-6 1.41 1.41L13.82 12Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
