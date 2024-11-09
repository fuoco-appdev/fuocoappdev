import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M2 10h4V6H2v4Zm6 12h4v-4H8v4Zm-6 0h4v-4H2v4Zm0-6h4v-4H2v4Zm6 0h4v-4H8v4Zm6 6h4v-4h-4v4Zm3-20c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5Zm.5 8h-1V9h1v1Zm0-2h-1V4h1v4ZM14 16h4v-2.07c-.33.05-.66.07-1 .07-1.07 0-2.09-.24-3-.68V16ZM8 6v4h2.68c-.44-.91-.68-1.93-.68-3 0-.34.02-.67.07-1H8Z" />
  </Svg>
)

export default Icon
