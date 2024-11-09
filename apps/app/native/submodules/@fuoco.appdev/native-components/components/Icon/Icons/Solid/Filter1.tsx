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
      d="M21 1H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2ZM1 5h2v16h16v2H3c-1.1 0-2-.9-2-2V5Zm15 10h-2V7h-2V5h4v10Zm-9 2h14V3H7v14Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
