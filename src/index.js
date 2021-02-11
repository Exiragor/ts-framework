import { Field } from './components/field/field';
import {createApp, registerComponents} from "./core/component";

const components = [
    Field
];

const initialHtml = `
    <app-field></app-field>
`;

createApp('.app', components, initialHtml);
