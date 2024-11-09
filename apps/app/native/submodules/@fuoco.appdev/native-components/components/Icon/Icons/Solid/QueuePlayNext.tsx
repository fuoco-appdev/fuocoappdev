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
      d="M21 3H3c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h5v2h8v-2h2v-2H3V5h18v8h2V5a2 2 0 0 0-2-2Zm-8 7V7h-2v3H8v2h3v3h2v-3h3v-2h-3Zm6.5 12.5L24 18l-4.5-4.5L18 15l3 3-3 3 1.5 1.5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
