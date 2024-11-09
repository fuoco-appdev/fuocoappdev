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
      d="M2.06 1.51.65 2.92l1.82 1.82C2.18 5.08 2 5.52 2 6v11H0v3h17.73l2.35 2.35 1.41-1.41L2.06 1.51ZM22 4v2H9.39l-2-2H22Zm2 5v10c0 .44-.29.8-.68.93L20.39 17H22v-7h-4v4.61l-2-2V9c0-.55.45-1 1-1h6c.55 0 1 .45 1 1ZM4 6.27V17h10.73L4 6.27Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
