import { Field } from './components/field/field';
import { createApp } from "./core/component";

const components = [
    Field
];

const initialHtml = `
    <app-field></app-field>
    </br>
    <app-field></app-field>
`;

createApp('.app', components, initialHtml);
