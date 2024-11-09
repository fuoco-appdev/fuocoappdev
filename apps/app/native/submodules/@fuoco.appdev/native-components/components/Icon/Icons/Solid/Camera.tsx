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
      d="M14.17 2.24 9.4 10.5l-.06.1-3.66-6.35a9.984 9.984 0 0 1 8.49-2.01Zm1.37.42c2.85 1.08 5.08 3.42 6 6.34h-9.66l3.66-6.34ZM21.8 10h-7.49l.29.5 4.76 8.25A9.911 9.911 0 0 0 22 12c0-.69-.07-1.35-.2-2ZM4.64 5.25 8.54 12l1.15 2H2.2a9.958 9.958 0 0 1 2.44-8.75ZM2.46 15c.92 2.92 3.15 5.26 6 6.34L12.12 15H2.46Zm7.37 6.76 3.9-6.76.93-1.6 3.66 6.35a9.984 9.984 0 0 1-8.49 2.01Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
