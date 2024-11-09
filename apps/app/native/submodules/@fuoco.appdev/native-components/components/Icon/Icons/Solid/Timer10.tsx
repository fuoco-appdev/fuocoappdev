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
      d="M13.67 7.256a2.753 2.753 0 0 0-1.135-.843 3.98 3.98 0 0 0-1.467-.259c-.536 0-1.025.086-1.468.259a2.66 2.66 0 0 0-1.135.843c-.314.393-.554.892-.73 1.524-.166.623-.258 1.39-.258 2.29v1.84c0 .901.083 1.668.258 2.29.176.633.416 1.141.739 1.534.314.393.692.68 1.135.853.443.173.932.268 1.468.268.545 0 1.034-.086 1.468-.268a2.67 2.67 0 0 0 1.126-.853c.314-.393.554-.9.72-1.533.166-.623.258-1.39.258-2.29v-1.84c0-.901-.083-1.668-.258-2.291-.166-.632-.406-1.14-.72-1.524ZM.915 9.508v-1.61L5.298 6.25h.231v11.5H3.683v-9.2l-2.77.958Zm21.369 4.054c.258.201.452.44.581.71.139.268.204.593.222.977a2.2 2.2 0 0 1-.23 1.016 2.32 2.32 0 0 1-.656.795c-.286.22-.628.393-1.025.518a4.43 4.43 0 0 1-1.329.182c-.554 0-1.034-.077-1.458-.24a3.347 3.347 0 0 1-1.062-.633 2.797 2.797 0 0 1-.646-.89 2.413 2.413 0 0 1-.222-1.007h1.745c.01.25.065.47.166.642.102.173.222.316.379.422.147.105.323.182.517.23.193.057.387.076.59.076.471 0 .831-.086 1.08-.277a.879.879 0 0 0 .37-.738.994.994 0 0 0-.065-.374.809.809 0 0 0-.25-.326 2.276 2.276 0 0 0-.525-.278 5.823 5.823 0 0 0-.877-.25 8.63 8.63 0 0 1-1.173-.344 3.606 3.606 0 0 1-.904-.508 2.095 2.095 0 0 1-.591-.7 1.952 1.952 0 0 1-.212-.92c0-.345.064-.66.212-.967.148-.307.35-.576.618-.806.268-.23.6-.412.979-.546a3.85 3.85 0 0 1 1.283-.201c.498 0 .95.067 1.348.21.397.145.729.327 1.006.566a2.437 2.437 0 0 1 .858 1.888h-1.8c0-.163-.037-.316-.092-.47a1.17 1.17 0 0 0-.268-.402 1.313 1.313 0 0 0-.443-.278 1.697 1.697 0 0 0-.61-.105c-.22 0-.424.028-.59.086a1.255 1.255 0 0 0-.415.23.847.847 0 0 0-.25.326.966.966 0 0 0-.009.767c.046.105.13.2.259.287.129.086.295.163.507.24.213.076.48.153.804.22.461.105.876.23 1.246.364.369.134.674.307.932.508Zm-9.572 1.073c.074-.402.11-.89.11-1.466h.01v-2.405a7.99 7.99 0 0 0-.12-1.457 2.791 2.791 0 0 0-.342-.949 1.283 1.283 0 0 0-.554-.527 1.663 1.663 0 0 0-.747-.163 1.72 1.72 0 0 0-.748.163 1.405 1.405 0 0 0-.554.527c-.157.25-.267.566-.35.959-.084.393-.12.881-.12 1.456v2.396c0 .575.036 1.064.12 1.466.083.403.203.729.35.978.148.25.332.431.554.546.221.115.48.173.757.173.286 0 .545-.058.757-.173a1.44 1.44 0 0 0 .545-.546c.147-.25.258-.575.332-.978Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon