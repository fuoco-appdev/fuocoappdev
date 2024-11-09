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
      d="M22 18V3H2v15H0v2h24v-2h-2Zm-8 0h-4v-1h4v1ZM4 15h16V5H4v10Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
