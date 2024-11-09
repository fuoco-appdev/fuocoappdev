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
      d="M8.1 12.75a2.5 2.5 0 0 1-2.5-2.5c0-1 .59-1.85 1.43-2.25-.84-.4-1.43-1.25-1.43-2.25a2.5 2.5 0 0 1 2.5-2.5c.53 0 1.02.16 1.42.44L9.5 3.5a2.5 2.5 0 0 1 5 0l-.02.19a2.5 2.5 0 0 1 3.92 2.06c0 1-.59 1.85-1.43 2.25.84.4 1.43 1.25 1.43 2.25a2.5 2.5 0 0 1-2.5 2.5c-.53 0-1.02-.16-1.42-.44l.02.19a2.5 2.5 0 0 1-5 0l.02-.19c-.41.28-.89.44-1.42.44ZM12 22a9 9 0 0 0 9-9 9 9 0 0 0-9 9Zm0 0a9 9 0 0 0-9-9 9 9 0 0 0 9 9Zm0-16.5a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
