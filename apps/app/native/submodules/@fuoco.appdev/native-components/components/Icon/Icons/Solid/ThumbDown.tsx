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
      d="M6 3h9c1.1 0 2 .9 2 2v10c0 .55-.22 1.05-.58 1.41L9.83 23l-1.06-1.05c-.27-.27-.44-.65-.44-1.06l.03-.32.95-4.57H3c-1.1 0-2-.9-2-2l.01-.08-.01-.01V12c0-.26.05-.5.14-.73l3.02-7.05C4.46 3.5 5.17 3 6 3Zm13 12V3h4v12h-4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
