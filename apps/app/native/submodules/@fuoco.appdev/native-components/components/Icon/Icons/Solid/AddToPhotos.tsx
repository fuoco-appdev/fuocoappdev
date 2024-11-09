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
      d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2ZM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6Zm11 5h4V9h-4V5h-2v4H9v2h4v4h2v-4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
