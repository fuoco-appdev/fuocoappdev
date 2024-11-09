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
      d="M22 16v2h-4v2h2l-3 3-3-3h2v-2H8c-1.1 0-2-.9-2-2V8H2V6h4V4H4l3-3 3 3H8v12h14Zm-6-8h-6V6h6c1.1 0 2 .9 2 2v6h-2V8Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
