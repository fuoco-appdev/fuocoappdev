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
      d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1ZM15 13c.83 0 1.5-.67 1.5-1.5v-3c0-.83-.67-1.5-1.5-1.5h-2.5v6H15Zm5.5-4.5H19v1h1.5V11H19v2h-1.5V7h3v1.5ZM10 9.5H9v-1h1v1ZM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6Zm11 5.5h-1v-3h1v3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
