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
      d="M17 6h3c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2V8c0-1.11.89-2 2-2h3V4c0-1.11.89-2 2-2h6c1.11 0 2 .89 2 2v2Zm-2-2H9v2h6V4Zm5 15H4v-2h16v2ZM4 14h16V8h-3v2h-2V8H9v2H7V8H4v6Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
