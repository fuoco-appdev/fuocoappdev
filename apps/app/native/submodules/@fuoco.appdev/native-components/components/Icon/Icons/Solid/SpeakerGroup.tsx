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
      d="M18.2 1H9.8C8.81 1 8 1.81 8 2.8v14.4c0 .99.81 1.79 1.8 1.79l8.4.01c.99 0 1.8-.81 1.8-1.8V2.8c0-.99-.81-1.8-1.8-1.8ZM14 3a2 2 0 1 1 .001 3.999A2 2 0 0 1 14 3Zm-4 9.5c0 2.21 1.79 4 4 4s4-1.79 4-4-1.79-4-4-4-4 1.79-4 4Zm4 2.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM4 5h2v16h10v2H6a2 2 0 0 1-2-2V5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
