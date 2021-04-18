import {createComponent, reactive, useInTemplate, useMethod} from "../../core/component";

export const Field = createComponent(
    'app-field',
    () => {
        const number = reactive(1);
        const updateNumber = () => {
            number.value++;
        }

        useInTemplate({
            number,
            updateNumber
        });

        return `
            <div>
                <label>
                    <span>Поле: </span>
                    <input al-model="test" />
                </label>
            
                <div>
                    Значение тут: <span al-bind="number"></span>
                </div>
                <button al-click="updateNumber">Увеличить</button>
            </div>
        `;
    }
);
