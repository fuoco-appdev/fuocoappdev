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
      d="M13 10V2c4.42 0 8 3.58 8 8h-8Zm8 1c0 1.84-.63 3.54-1.68 4.89.72.64 1.18 1.57 1.18 2.61 0 1.93-1.57 3.5-3.5 3.5-1.76 0-3.22-1.3-3.46-3h-2.08c-.24 1.7-1.7 3-3.46 3-1.93 0-3.5-1.57-3.5-3.5 0-1.33.74-2.49 1.84-3.08C6.11 15.07 4.22 11 4.22 11H2V9h3.49l.95 2H21ZM8 20c-.83 0-1.5-.67-1.5-1.5S7.17 17 8 17s1.5.67 1.5 1.5S8.83 20 8 20Zm7.5-1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5S17.83 17 17 17s-1.5.67-1.5 1.5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
