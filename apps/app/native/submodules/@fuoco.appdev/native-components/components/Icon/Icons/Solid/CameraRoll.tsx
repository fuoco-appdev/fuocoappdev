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
      d="M14 5c0-1.1-.9-2-2-2h-1V2c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1v1H4c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2h8V5h-8Zm-4 13v-2h2v2h-2Zm0-11v2h2V7h-2Zm6 11h-2v-2h2v2Zm-2-9h2V7h-2v2Zm6 9h-2v-2h2v2Zm-2-9h2V7h-2v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
