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
      d="M20 2H2C.89 2 0 2.89 0 4v12a2 2 0 0 0 2 2h7v2H7v2h8v-2h-2v-2h2v-2H2V4h18v5h2V4a2 2 0 0 0-2-2Zm-2 9 5 .01c.55 0 1 .44 1 .99v9c0 .55-.45 1-1 1h-5c-.55 0-1-.45-1-1v-9c0-.55.45-1 1-1Zm0 9h5v-7h-5v7ZM11 6l.97 3H15l-2.47 1.76.94 2.91-2.47-1.8-2.47 1.8.94-2.91L7 9h3.03L11 6Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
