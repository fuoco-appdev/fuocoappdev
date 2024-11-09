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
      d="M11 7V3h1a9 9 0 1 1-9 9c0-2.95 1.42-5.55 3.61-7.19v-.02l6.8 6.8L12 13 6.58 7.58A6.917 6.917 0 0 0 5 12c0 3.87 3.13 7 7 7s7-3.13 7-7c0-3.53-2.61-6.43-6-6.92V7h-2Zm1 11c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Zm6-6c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1ZM7 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
