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
      d="M7 1h10c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2Zm10 18V5H7v14h10ZM12 6.72c-1.96 0-3.5 1.52-3.5 3.47h1.75c0-.93.82-1.75 1.75-1.75s1.75.82 1.75 1.75c0 .767-.505 1.163-1.072 1.608-.728.571-1.558 1.223-1.558 2.842h1.76c0-.945.61-1.488 1.24-2.05.678-.604 1.38-1.23 1.38-2.4 0-1.96-1.54-3.47-3.5-3.47ZM13 18v-2h-2v2h2Z"
      clipRule="evenodd"
      opacity={0.87}
    />
  </Svg>
)

export default Icon
