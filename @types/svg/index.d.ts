//tipagem para remover o alerta e para tipar todos os SVGs coms suas props corretas
declare module "*.svg"{
    import React from 'react';
    import {SvgProps} from 'react-native-svg';

    const content: React.FC<SvgProps>;
    export default content;
}