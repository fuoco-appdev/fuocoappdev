import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20.5 16.5c0 1.66-1.34 3-3 3h-2v-2h3v-4a3.96 3.96 0 0 0-2.91-3.82l-2.62-.74C12.12 8.69 11.5 7.89 11.5 7V2.5h-9v15h3v2h-4v2h16c2.76 0 5-2.24 5-5h-2Zm-16-1v-11h5v1H8c-.28 0-.5.22-.5.5s.22.5.5.5h1.5l.1 1H8c-.28 0-.5.22-.5.5s.22.5.5.5h1.81c.45 1.12 1.4 2.01 2.6 2.36l2.62.73c.87.24 1.47 1.01 1.47 1.91v2h-12Zm9 4h-6v-2h6v2Z" />
  </Svg>
)

export default Icon
