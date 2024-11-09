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
      d="M6 2h8l6 6v12c0 1.1-.9 2-2 2H5.99C4.89 22 4 21.1 4 20l.01-16c0-1.1.89-2 1.99-2Zm1.42 13c.77 1.76 2.53 3 4.58 3 2.76 0 5-2.24 5-5s-2.24-5-5-5c-1.77 0-3.31.92-4.2 2.3L6.5 9v4h4l-1.6-1.6A3.5 3.5 0 0 1 12 9.5c1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5c-1.19 0-2.24-.6-2.87-1.5H7.42Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
