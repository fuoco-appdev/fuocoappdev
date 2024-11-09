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
      d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12Zm2 0c0 4.08 3.06 7.44 7 7.93V4.07C7.05 4.56 4 7.92 4 12Zm9-7.93c1.03.13 2 .45 2.87.93H13v-.93ZM18.24 7H13v1h5.92c-.2-.35-.43-.69-.68-1ZM13 10h6.74c.08.33.15.66.19 1H13v-1Zm0 9v.93c1.03-.13 2-.45 2.87-.93H13Zm5.24-2H13v-1h5.92c-.2.35-.43.69-.68 1ZM13 14h6.74c.08-.33.15-.66.19-1H13v1Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
