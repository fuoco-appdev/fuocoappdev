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
      d="M3 5h14l6 6v5h-2c0 1.66-1.34 3-3 3s-3-1.34-3-3H9c0 1.66-1.34 3-3 3s-3-1.34-3-3H1V7a2 2 0 0 1 2-2Zm0 2v4h4V7H3Zm3 10.25a1.25 1.25 0 1 1 .001-2.501A1.25 1.25 0 0 1 6 17.25ZM9 11h4V7H9v4Zm9 6.25a1.25 1.25 0 1 1 .001-2.501A1.25 1.25 0 0 1 18 17.25ZM15 7v4h5l-4-4h-1Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
