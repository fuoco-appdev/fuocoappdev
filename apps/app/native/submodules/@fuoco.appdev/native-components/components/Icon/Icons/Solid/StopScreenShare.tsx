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
      d="m1.11 2.98 1.55 1.56S2 5.11 2 6.01V16l.01.01a2 2 0 0 0 1.97 2L0 18v2h18.13l2.71 2.71 1.41-1.41L2.52 1.57 1.11 2.98ZM13 7v2.13c-.02 0-.04.01-.06.02L7.8 4.02H20c1.1 0 2 .88 2 1.98v10c0 .61-.27 1.14-.7 1.51l-5.58-5.58L17 10.74 13 7Zm10.79 13-2-2H24v2h-.21Zm-13.12-7.46-1.59-1.59C7.94 12.07 7.31 13.52 7 15c.96-1.29 2.13-2.08 3.67-2.46Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
