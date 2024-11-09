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
      d="M15 1H9v2h6V1Zm-3 5c3.87 0 7 3.13 7 7 0 1.12-.27 2.18-.74 3.12l1.47 1.47C20.53 16.25 21 14.68 21 13c0-2.12-.74-4.07-1.97-5.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.961 8.961 0 0 0 12 4c-1.68 0-3.25.47-4.59 1.27l1.47 1.47c.94-.47 2-.74 3.12-.74Zm-1 2v.86l2 2V8h-2ZM3.16 3.86 1.75 5.27 4.5 8.02A9.044 9.044 0 0 0 3 13c0 4.97 4.02 9 9 9 1.84 0 3.55-.55 4.98-1.5l2.5 2.5 1.41-1.41L3.16 3.86ZM5 13c0 3.87 3.13 7 7 7 1.29 0 2.49-.35 3.53-.95L5.96 9.48A6.876 6.876 0 0 0 5 13Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
