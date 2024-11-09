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
      d="M1 21 12 2l11 19H1Zm18.53-2L12 5.99 4.47 19h15.06ZM11 16v2h2v-2h-2Zm0-6h2v4h-2v-4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
