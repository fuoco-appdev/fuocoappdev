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
      d="M12 13v-1.29l9.87 9.88L20.46 23 14 16.54V21H3v-2h2V7.54l-4-4 1.41-1.41L11.29 11H10v2h2Zm5-7h-3v4.88L6.12 3H14v1h5v11.88l-2-2V6Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
