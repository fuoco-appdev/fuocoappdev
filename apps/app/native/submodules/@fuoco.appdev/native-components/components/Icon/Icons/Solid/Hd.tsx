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
      d="M5 3h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm4.5 12H11V9H9.5v2.5h-2V9H6v6h1.5v-2h2v2ZM13 9h4c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1h-4V9Zm3.5 4.5h-2v-3h2v3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
