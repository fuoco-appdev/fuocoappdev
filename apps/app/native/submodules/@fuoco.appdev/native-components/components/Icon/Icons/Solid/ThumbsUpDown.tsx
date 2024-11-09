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
      d="M11 5c.55 0 1 .45 1 1v1.25c0 .19-.04.38-.11.55l-2.26 5.29c-.23.53-.76.91-1.38.91H1.5C.67 14 0 13.33 0 12.5V6c0-.41.17-.79.44-1.06L5.38 0l.79.79c.2.21.33.49.33.8l-.02.23L5.82 5H11Zm4.75 5h6.75c.83 0 1.5.67 1.5 1.5V18c0 .41-.17.79-.44 1.06L18.62 24l-.79-.78c-.2-.21-.33-.49-.33-.8l.02-.24.66-3.18H13c-.55 0-1-.45-1-1v-1.25c0-.19.04-.38.11-.55l2.26-5.29c.23-.53.76-.91 1.38-.91Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
