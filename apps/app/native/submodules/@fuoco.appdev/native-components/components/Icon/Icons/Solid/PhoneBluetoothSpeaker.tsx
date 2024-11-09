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
      d="M17 7.21 14.71 9.5 14 8.79 16.79 6 14 3.21l.71-.71L17 4.79V1h.5l2.86 2.85L18.21 6l2.14 2.15L17.5 11H17V7.21Zm1.94-3.36L18 2.91v1.88l.94-.94ZM18 7.21l.94.94-.94.94V7.21Zm-1.57 7.72c1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1l-2.2 2.21c1.44 2.84 3.76 5.15 6.59 6.59l2.2-2.2c.28-.27.67-.35 1.02-.24Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
