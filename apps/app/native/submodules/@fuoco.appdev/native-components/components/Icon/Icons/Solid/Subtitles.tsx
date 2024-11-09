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
      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2ZM4 12h4v2H4v-2Zm0 6h10v-2H4v2Zm16 0h-4v-2h4v2Zm-10-4h10v-2H10v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
