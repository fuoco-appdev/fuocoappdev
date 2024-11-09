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
      d="M1.41 1.69 0 3.1l2 2V21h15.9l3 3 1.41-1.41-20.9-20.9ZM6 19H4v-2h2v2Zm-2-4h2v-2H4v2Zm0-4V9h2v2H4Zm4 8h2v-2H8v2Zm0-4v-2h2v2H8Zm4 2v2h3.9l-2-2H12ZM8 5h2v2h-.45L12 9.45V9h8v8.45l2 2V7H12V3H5.55L8 5.45V5Zm10 6h-2v2h2v-2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
