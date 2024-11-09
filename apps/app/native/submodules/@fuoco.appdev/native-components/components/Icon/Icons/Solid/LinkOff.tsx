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
      d="M5.11 7.38 2 4.27l1.41-1.41L20.15 19.6l-1.41 1.41L14.73 17H13v-1.73L10.73 13H8v-2h.73L6.66 8.93A3.097 3.097 0 0 0 3.9 12c0 1.71 1.39 3.1 3.1 3.1h4V17H7c-2.76 0-5-2.24-5-5 0-2.09 1.29-3.88 3.11-4.62ZM17 7h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1 0 1.27-.77 2.37-1.87 2.84l1.4 1.4A4.986 4.986 0 0 0 22 12c0-2.76-2.24-5-5-5Zm-2.61 4L16 12.61V11h-1.61Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
