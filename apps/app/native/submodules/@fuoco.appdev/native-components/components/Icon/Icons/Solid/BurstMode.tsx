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
      d="M3 5H1v14h2V5Zm4 0H5v14h2V5Zm15 0H10c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1Zm-8.5 8.85L11 17h10l-3.21-4.22-2.5 3.22-1.79-2.15Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
