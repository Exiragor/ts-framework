import {createComponent, reactive, useMethod} from "../../core/component";

export const Field = createComponent(
    'app-field',
    () => {
        const [number, numberChange] = reactive(1);
        const updateNumber = useMethod(() => {
            numberChange(2);
        });

        return `
            <div>
                <label>
                    <span>Поле: </span>
                    <input al-model="test" />
                </label>
            
                <div>
                    Значение тут: <span al-bind="${number}"></span>
                </div>
                <button al-click="${updateNumber}">Увеличить</button>
            </div>
        `;
    }
);
