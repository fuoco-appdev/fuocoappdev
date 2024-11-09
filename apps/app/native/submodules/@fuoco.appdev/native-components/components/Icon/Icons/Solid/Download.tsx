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
      d="M15 9h4l-7 7-7-7h4V3h6v6ZM5 20v-2h14v2H5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
