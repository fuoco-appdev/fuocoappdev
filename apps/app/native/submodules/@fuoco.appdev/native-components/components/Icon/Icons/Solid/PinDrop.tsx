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
      d="M18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 4.5 6 11 6 11s6-6.5 6-11Zm-8 0c0-1.1.9-2 2-2s2 .9 2 2a2 2 0 1 1-4 0ZM5 22v-2h14v2H5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
