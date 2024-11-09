import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17.805 8.29c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5Zm-6.67-1h9.17v8h-1.17l1.87 1.87c.75-.29 1.3-1.02 1.3-1.87v-8c0-1.1-.9-2-2-2H9.135l2 2Zm8.95 14.61-4.61-4.61H4.305c-1.1 0-2-.9-2-2v-8c0-.85.55-1.58 1.3-1.87l-1.91-1.91 1.41-1.41 18.38 18.38-1.4 1.42Zm-6.61-6.61-3-3h-1.17v2h-2v-2h-2v-2h2V9.12l-1.83-1.83h-1.17v8h9.17Z" />
  </Svg>
)

export default Icon
