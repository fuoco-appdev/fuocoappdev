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
      d="M5 3h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2Zm2.5 4.5h-2V9h2v2H9V9h2V7.5H9v-2H7.5v2ZM19 5v14H5L19 5Zm-2 10.5V17h-5v-1.5h5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
