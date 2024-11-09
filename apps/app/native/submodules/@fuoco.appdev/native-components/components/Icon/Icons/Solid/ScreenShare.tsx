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
      d="M22 16c0 1.1-.9 2-2 2h4v2H0v-2h4a2 2 0 0 1-2-2V6c0-1.11.89-2 2-2h16a2 2 0 0 1 2 2v10Zm-9-3.72v2.19l4-3.74L13 7v2.13c-3.89.54-5.44 3.2-6 5.87 1.39-1.87 3.22-2.72 6-2.72Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
