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
      d="m8.6 15 .9-2.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1ZM5 17v2h14v-2H5Zm8.87-6L12 5.98 10.13 11h3.74Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
