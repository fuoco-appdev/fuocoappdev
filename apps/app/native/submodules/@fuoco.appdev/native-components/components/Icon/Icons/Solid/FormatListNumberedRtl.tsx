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
      d="M20 8h-1V5h-1V4h2v4Zm0 9.5V17h-2v-1h3v4h-3v-1h2v-.5h-1v-1h1ZM18 11h1.8L18 13.1v.9h3v-1h-1.8l1.8-2.1V10h-3v1Zm-2-6H2v2h14V5ZM2 17h14v2H2v-2Zm14-6H2v2h14v-2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
