import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M2.5 14c0 1.3.84 2.4 2 2.82V20h-2v2h6v-2h-2v-3.18c1.16-.42 2-1.52 2-2.82V6h-6v8Zm2-6h2v3h-2V8Zm0 5h2v1c0 .55-.45 1-1 1s-1-.45-1-1v-1Z" />
    <Path d="m20.14 8.54-.96-.32a1 1 0 0 1-.68-.95V3c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1v4.28a1 1 0 0 1-.68.95l-.96.32c-.81.28-1.36 1.04-1.36 1.9V20c0 1.1.9 2 2 2h7c1.1 0 2-.9 2-2v-9.56c0-.86-.55-1.62-1.36-1.9ZM15.5 4h1v1h-1V4Zm4 16h-7v-2h7v2Zm0-4h-7v-2h7v2Zm0-4h-7v-1.56l.95-.32c1.23-.4 2.05-1.55 2.05-2.84V7h1v.28a3 3 0 0 0 2.05 2.85l.95.31V12Z" />
  </Svg>
)

export default Icon
