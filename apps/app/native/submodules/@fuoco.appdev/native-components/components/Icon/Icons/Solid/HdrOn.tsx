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
      d="M4.5 11h2V9H8v6H6.5v-2.5h-2V15H3V9h1.5v2Zm15.6 1.9c.5-.3.9-.8.9-1.4v-1c0-.8-.7-1.5-1.5-1.5H16v6h1.5v-2h1.1l.9 2H21l-.9-2.1Zm-.6-1.4h-2v-1h2v1ZM13 9H9.5v6H13c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5Zm-2 4.5h2v-3h-2v3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
