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
      d="M15.17 2.17c3.87 0 7 3.13 7 7A7 7 0 0 1 16 16.12V20h3v2H3v-5H2v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v4H6v3h8v-3.94a6.98 6.98 0 0 1-5.83-6.89c0-3.87 3.13-7 7-7ZM6 9.5c0 .83-.67 1.5-1.5 1.5S3 10.33 3 9.5 3.67 8 4.5 8 6 8.67 6 9.5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
