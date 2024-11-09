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
      d="M18 2.01 6 2c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h12c1.11 0 2-.89 2-2V4c0-1.11-.89-1.99-2-1.99ZM11 5c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1ZM9.17 16.83a4.008 4.008 0 0 0 5.66 0 4.008 4.008 0 0 0 0-5.66l-5.66 5.66ZM7 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1ZM6 14c0 3.31 2.69 6 6 6s6-2.69 6-6-2.69-6-6-6-6 2.69-6 6Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
