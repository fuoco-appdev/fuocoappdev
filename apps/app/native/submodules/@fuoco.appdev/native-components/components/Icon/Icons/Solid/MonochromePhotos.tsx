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
      d="M16.8 5H20c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h3.2L9 3h6l1.8 2ZM12 19h8V7h-8v1c-2.8 0-5 2.2-5 5s2.2 5 5 5v1Zm0-2.8V18c2.8 0 5-2.2 5-5s-2.2-5-5-5v1.8c-1.8 0-3.2 1.4-3.2 3.2 0 1.8 1.4 3.2 3.2 3.2Zm0 0c1.8 0 3.2-1.4 3.2-3.2 0-1.8-1.4-3.2-3.2-3.2v6.4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
