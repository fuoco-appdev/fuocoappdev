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
      d="M18 1v4h5l-1.65 16.53c-.1.82-.79 1.47-1.63 1.47h-1.7L18 15c0-4.23-3.1-6.84-6.77-7.69L11 5h5V1h2ZM2.01 22.99c-.56 0-1.01-.45-1.01-1.01V21h15.01v.98c0 .56-.45 1.01-1.01 1.01H2.01Zm6.49-14C4.75 8.99 1 11 1 15h15c0-4-3.75-6.01-7.5-6.01ZM16 19v-2H1v2h15Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
