import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17 5h-2V3h2v2Zm-2 10v6l2.29-2.29 2.3 2.29L21 19.59l-2.29-2.29L21 15h-6Zm4-6h2V7h-2v2Zm0 4h2v-2h-2v2Zm-8 8h2v-2h-2v2ZM7 5h2V3H7v2ZM3 17h2v-2H3v2Zm2 4v-2H3c0 1.1.9 2 2 2ZM19 3v2h2c0-1.1-.9-2-2-2Zm-8 2h2V3h-2v2ZM3 9h2V7H3v2Zm4 12h2v-2H7v2Zm-4-8h2v-2H3v2Zm0-8h2V3c-1.1 0-2 .9-2 2Z" />
  </Svg>
)

export default Icon
