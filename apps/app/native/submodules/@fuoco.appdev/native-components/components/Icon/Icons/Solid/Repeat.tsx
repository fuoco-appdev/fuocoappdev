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
      d="M17 7H7v4H5V5h12V2l4 4-4 4V7ZM7 17h10v-4h2v6H7v3l-4-4 4-4v3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
