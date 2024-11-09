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
      d="M11 22h2V2h-2v20Zm-4-4h2V6H7v12Zm-2-4H3v-4h2v4Zm10 4h2V6h-2v12Zm4-4v-4h2v4h-2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
