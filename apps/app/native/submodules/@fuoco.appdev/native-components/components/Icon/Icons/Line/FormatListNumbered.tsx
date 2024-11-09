import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M2.5 17h2v.5h-1v1h1v.5h-2v1h3v-4h-3v1Zm1-9h1V4h-2v1h1v3Zm-1 3h1.8l-1.8 2.1v.9h3v-1H3.7l1.8-2.1V10h-3v1Zm5-6v2h14V5h-14Zm0 14h14v-2h-14v2Zm0-6h14v-2h-14v2Z" />
  </Svg>
)

export default Icon
