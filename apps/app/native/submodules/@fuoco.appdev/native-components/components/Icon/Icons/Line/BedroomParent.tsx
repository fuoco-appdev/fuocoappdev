import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18.35 11.45V9c0-1.1-.9-2-2-2H13c-.37 0-.72.12-1 .32-.28-.2-.63-.32-1-.32H7.65c-1.1 0-2 .9-2 2v2.45c-.4.46-.65 1.06-.65 1.72V17h1.5v-1.5h11V17H19v-3.83c0-.66-.25-1.26-.65-1.72Zm-1.6-.95h-4v-2h4v2Zm-9.5-2h4v2h-4v-2ZM17.5 14h-11v-1c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v1ZM20 4v16H4V4h16Zm0-2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Z" />
  </Svg>
)

export default Icon
