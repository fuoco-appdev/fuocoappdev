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
      d="M5 3h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2Zm6 4H6v1.5h5V7Zm8 12H5L19 5v14Zm-4.5-1v-2h-2v-1.5h2v-2H16v2h2V16h-2v2h-1.5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
