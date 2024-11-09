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
      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2ZM7.76 16.24l-1.41 1.41A7.91 7.91 0 0 1 4 12c0-2.05.78-4.1 2.34-5.66l1.41 1.41A6.046 6.046 0 0 0 6 12c0 1.54.59 3.07 1.76 4.24ZM8 12c0 2.21 1.79 4 4 4s4-1.79 4-4-1.79-4-4-4-4 1.79-4 4Zm9.66 5.66-1.41-1.41A6.046 6.046 0 0 0 18 12c0-1.54-.59-3.07-1.76-4.24l1.41-1.41A7.909 7.909 0 0 1 20 12c0 2.05-.78 4.1-2.34 5.66ZM10 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
