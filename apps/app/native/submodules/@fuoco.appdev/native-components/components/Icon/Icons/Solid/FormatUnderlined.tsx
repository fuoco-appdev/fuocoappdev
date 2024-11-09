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
      d="M18 11c0 3.31-2.69 6-6 6s-6-2.69-6-6V3h2.5v8c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5V3H18v8ZM5 21v-2h14v2H5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
