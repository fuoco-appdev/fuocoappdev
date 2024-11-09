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
      d="M16.43 14.93c1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.01l-2.2 2.21c1.44 2.83 3.76 5.14 6.59 6.58l2.2-2.2c.28-.27.67-.35 1.02-.24ZM12 13V3h9v7h-6l-3 3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
