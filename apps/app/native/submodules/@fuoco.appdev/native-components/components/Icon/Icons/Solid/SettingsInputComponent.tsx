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
      d="M4 1c.55 0 1 .45 1 1v4h2v6H1V6h2V2c0-.55.45-1 1-1Zm7 17.82C9.84 18.4 9 17.3 9 16v-2h6v2c0 1.31-.84 2.41-2 2.82V23h-2v-4.18ZM1 16c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16v-2H1v2ZM21 2v4h2v6h-6V6h2V2c0-.55.45-1 1-1s1 .45 1 1Zm-8 0c0-.55-.45-1-1-1s-1 .45-1 1v4H9v6h6V6h-2V2Zm6 16.82c-1.16-.42-2-1.52-2-2.82v-2h6v2c0 1.31-.84 2.41-2 2.82V23h-2v-4.18Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
