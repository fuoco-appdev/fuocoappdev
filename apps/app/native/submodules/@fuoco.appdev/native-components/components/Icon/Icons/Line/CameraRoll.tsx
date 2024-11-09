import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M14 5.5c0-1.1-.9-2-2-2h-1v-1c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1v1H4c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2h8v-15h-8Zm6 13h-8v2H4v-15h3v-2h2v2h3v2h8v11Zm-11-3h2v2H9v-2Zm0-7h2v2H9v-2Zm4 7h2v2h-2v-2Zm0-7h2v2h-2v-2Zm4 7h2v2h-2v-2Zm0-7h2v2h-2v-2Z" />
  </Svg>
)

export default Icon
