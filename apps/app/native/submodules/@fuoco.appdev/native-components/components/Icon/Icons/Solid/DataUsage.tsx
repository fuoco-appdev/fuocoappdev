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
      d="M5 12c0 3.87 3.13 7 7 7a6.95 6.95 0 0 0 5.45-2.62l2.6 1.53A9.975 9.975 0 0 1 11.99 22C6.47 22 2 17.52 2 12a9.99 9.99 0 0 1 9-9.95v3.03C7.61 5.57 5 8.47 5 12Zm8-6.92V2.05c5.05.5 9 4.77 9 9.95 0 1.45-.32 2.83-.88 4.07l-2.6-1.53c.3-.79.48-1.64.48-2.54 0-3.53-2.61-6.43-6-6.92Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
