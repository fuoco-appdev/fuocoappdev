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
      d="M17.5 5c.66 0 1.22.42 1.42 1.01L21 12v8c0 .55-.45 1-1 1h-1c-.55 0-1-.45-1-1v-1H6v1c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1v-8l2.08-5.99C5.29 5.42 5.84 5 6.5 5H9V3h6v2h2.5ZM5 14.5c0 .83.67 1.5 1.5 1.5S8 15.33 8 14.5 7.33 13 6.5 13 5 13.67 5 14.5ZM17.5 16c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5Zm-11-9.5L5 11h14l-1.5-4.5h-11Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
