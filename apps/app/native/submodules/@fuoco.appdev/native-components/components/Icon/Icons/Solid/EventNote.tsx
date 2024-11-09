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
      d="M18 3h1c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h1V1h2v2h8V1h2v2ZM7 10h10v2H7v-2Zm12 9H5V8h14v11ZM7 14h7v2H7v-2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
