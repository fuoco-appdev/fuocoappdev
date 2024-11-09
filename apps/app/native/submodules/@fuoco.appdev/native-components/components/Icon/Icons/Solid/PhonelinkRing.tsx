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
      d="M14 1H4c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2Zm5.1 7.7 1-1c2.5 2.4 2.5 6.2 0 8.5l-1-1c1.8-1.9 1.8-4.7 0-6.5ZM17 10.8l1-1c1.2 1.3 1.2 3.1 0 4.3l-1-1c.5-.7.5-1.6 0-2.3ZM4 20h10V4H4v16Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
