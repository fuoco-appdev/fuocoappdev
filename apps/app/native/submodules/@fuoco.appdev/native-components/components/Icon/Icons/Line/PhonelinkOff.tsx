import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M22 6.07v-2H7.39l2 2H22Zm2 13v-10c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v3.61l2 2v-4.61h4v7h-1.61L23.32 20c.39-.13.68-.49.68-.93ZM2.06 1.58.65 2.99l1.82 1.82c-.29.34-.47.78-.47 1.26v11H0v3h17.73l2.35 2.35 1.41-1.41L2.06 1.58ZM4 17.07V6.34l10.73 10.73H4Z" />
  </Svg>
)

export default Icon
