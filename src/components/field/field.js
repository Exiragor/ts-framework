import {createComponent} from "../../core/Component";

export const Field = createComponent(() => {
    let test = 'значение';

    return `
        <div>
            <label>
                <span>Поле: </span>
                <input al-model="test" />
            </label>
        
            <div>
                Значение тут: {{ test }}
            </div>
        </div>
`;
});
