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
      d="M14.5 7.9V6.08L19 5v13h-2V7.4l-2.5.5ZM8 8h2v4h4v2h-4v4H8v-4H4v-2h4V8Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
