import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M21.655 12.29a8.865 8.865 0 0 1-1.33 3.79l-1.47-1.47c.38-.71.65-1.49.77-2.32h2.03ZM9.385 5.13a7.06 7.06 0 0 1 3.33-.84 7.01 7.01 0 0 1 5.74 3h-2.74v2h6v-6h-2v2.36c-1.65-2.04-4.17-3.36-7-3.36-1.76 0-3.4.51-4.78 1.39l1.45 1.45Zm2.33 1.16v1.17l2 2V6.29h-2Zm8.78 15.61-3-3a8.973 8.973 0 0 1-4.78 1.39 9 9 0 0 1-9-9c0-1.76.51-3.4 1.39-4.78l-3-3 1.41-1.41 18.38 18.38-1.4 1.42Zm-4.46-4.46-9.48-9.48a7.06 7.06 0 0 0-.84 3.33c0 3.86 3.14 7 7 7 1.2 0 2.34-.31 3.32-.85Z" />
  </Svg>
)

export default Icon
