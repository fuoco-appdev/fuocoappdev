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
      d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7Zm.88 13.75h-1.75V14h1.75v1.75Zm-1.75-2.87h1.75c0-.959.62-1.503 1.258-2.062C14.81 10.23 15.5 9.624 15.5 8.5 15.5 6.57 13.93 5 12 5S8.5 6.57 8.5 8.5h1.75c0-.96.79-1.75 1.75-1.75s1.75.79 1.75 1.75c0 .775-.508 1.166-1.077 1.604-.723.556-1.543 1.187-1.543 2.776Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
