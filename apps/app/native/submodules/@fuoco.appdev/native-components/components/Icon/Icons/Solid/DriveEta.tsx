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
      d="M17.5 4c.66 0 1.22.42 1.42 1.01L21 11v8c0 .55-.45 1-1 1h-1c-.55 0-1-.45-1-1v-1H6v1c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1v-8l2.08-5.99C5.29 4.42 5.84 4 6.5 4h11ZM5 13.5c0 .83.67 1.5 1.5 1.5S8 14.33 8 13.5 7.33 12 6.5 12 5 12.67 5 13.5ZM17.5 15c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5Zm-11-9.5L5 10h14l-1.5-4.5h-11Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
