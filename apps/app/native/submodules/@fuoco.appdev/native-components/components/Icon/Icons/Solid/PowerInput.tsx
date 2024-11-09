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
      d="M2 11V9h19v2H2Zm5 4H2v-2h5v2Zm2 0h5v-2H9v2Zm12 0h-5v-2h5v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
