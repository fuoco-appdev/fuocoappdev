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
      d="M17 3c1.1 0 2 .9 2 2v11.11L7.95 5.06 10 3h7Zm-13.21.74 17.47 17.47-1.41 1.41L18.23 21H7a2 2 0 0 1-2-2V7.77L2.38 5.15l1.41-1.41Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
