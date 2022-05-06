import { ChangeEventHandler } from 'react';
import { OptionsData } from './OptionsData';

export type SelectionProps = {
   options: OptionsData,
   name: string,
   title: string,
   onChangeSelection: (eventTarget: HTMLSelectElement) => void,
}