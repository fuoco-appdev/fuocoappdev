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
      d="M21 3v2l-8 9v5h5v2H6v-2h5v-5L3 5V3h18ZM5.66 5l1.77 2h9.14l1.78-2H5.66Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
