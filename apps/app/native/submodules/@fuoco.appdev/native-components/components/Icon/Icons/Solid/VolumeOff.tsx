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
      d="m2.93 4.34 1.41-1.41 16.73 16.72-1.41 1.41-2.05-2.05A8.94 8.94 0 0 1 14 20.76V18.7c.8-.23 1.53-.62 2.18-1.11L12 13.41V20l-5-5H3V9h4l.29-.3-4.36-4.36Zm15.66 10c.26-.73.41-1.52.41-2.34 0-3.17-2.11-5.85-5-6.71V3.23c4.01.91 7 4.49 7 8.77 0 1.39-.32 2.7-.88 3.87l-1.53-1.53ZM12 4l-1.88 1.88L12 7.76V4Zm2 3.97A4.5 4.5 0 0 1 16.5 12c0 .08-.01.16-.02.24L14 9.76V7.97Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
