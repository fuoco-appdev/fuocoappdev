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
      d="m11 7.34 5.66-5.65 5.66 5.65L16.66 13 11 7.34Zm0 0V11H3V3h8v4.34ZM16.66 13H13v8h8v-8h-4.34ZM11 21H3v-8h8v8Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
