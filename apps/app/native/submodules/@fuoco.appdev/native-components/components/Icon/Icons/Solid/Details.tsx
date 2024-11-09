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
      d="M12 20 3 4h18l-9 16Zm5.63-14H6.38L12 16l5.63-10Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
