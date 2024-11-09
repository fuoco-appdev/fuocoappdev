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
      d="M15 10v6H9v-6H5l7-7 7 7h-4Zm4 10v-2H5v2h14Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
