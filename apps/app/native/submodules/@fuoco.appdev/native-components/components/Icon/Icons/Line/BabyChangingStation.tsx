import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M14 8.5v2h-3L8.31 9.32 7 13.25v9.25H3v-10l1.58-4.63A2.003 2.003 0 0 1 7.3 6.68l4.15 1.83L14 8.5Zm-6-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm1 18h12v-2H9v2Zm10.5-3c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5Zm-6.5-4c0-.55-.45-1-1-1H9v2h2v1c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-3h-2v2h-2v-1Z" />
  </Svg>
)

export default Icon
