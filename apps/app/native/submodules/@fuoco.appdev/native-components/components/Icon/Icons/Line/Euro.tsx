import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M15.5 18.5A6.48 6.48 0 0 1 9.74 15h5.76l1-2H9.08c-.05-.33-.08-.66-.08-1 0-.34.03-.67.08-1h6.42l1-2H9.74a6.491 6.491 0 0 1 5.76-3.5c1.61 0 3.09.59 4.23 1.57L21.5 5.3a8.955 8.955 0 0 0-6-2.3c-3.92 0-7.24 2.51-8.48 6H3.5l-1 2h4.06a8.262 8.262 0 0 0 0 2H3.5l-1 2h4.52c1.24 3.49 4.56 6 8.48 6 2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57Z" />
  </Svg>
)

export default Icon
