import './App.css';
import {useForm, useFieldArray, Control, UseFormRegister, useWatch} from 'react-hook-form'

interface Animal {
    readonly name: string;
    readonly hasNicknames: boolean;
    readonly nicknames: readonly { readonly value: string }[]
}

interface FormData {
    readonly animals: readonly Animal[];
}

const AnimalField = ({control, index, register}: {
    control: Control<FormData>;
    index: number;
    register: UseFormRegister<FormData>;
}) => {
    const hasNicknames = useWatch({
        name: `animals.${index}.hasNicknames` as 'animals.0.hasNicknames',
        control,
        defaultValue: false,
    });

    const {fields, append} = useFieldArray({
        control,
        name: `animals.${index}.nicknames` as 'animals.0.nicknames',
    });

    return hasNicknames ? (
        <>
            <p>
                <button type='button' onClick={() => append({})}>Add Nickname</button>
            </p>

            {fields.map((field, nickNameIndex: number) => (
                <input
                    type='text'
                    key={field.id}
                    defaultValue={field.value}
                    {...register(`animals.${index}.nicknames.${nickNameIndex}.value` as 'animals.0.nicknames.0.value')} />
            ))}
        </>
    ) : null
}

const defaultValues = {
    "animals":
        [
            {
                "name": "Cat",
                "hasNicknames": true,
                "nicknames": [{
                    "value": "Kitten"
                }],
            },
        ],
}

function App() {
    const {register, control, handleSubmit, watch} = useForm<FormData>({defaultValues, shouldUnregister: true});
    const {fields, append} = useFieldArray({name: 'animals', control});
    const watchAllFields = watch();

    const onSubmit = (data: FormData) => {
        console.log(JSON.stringify(data, null, 2))
    }

    return (
        <div className='App'>
            <form onSubmit={handleSubmit(onSubmit)}>

                {fields.map((field, index: number) => {
                    return (
                        <fieldset key={field.id} className='animal'>
                            <label>
                                <b>Animal name:</b>
                                <input
                                    type='text'
                                    defaultValue={field.name}
                                    {...register(`animals.${index}.name` as 'animals.0.name')} />
                            </label>

                            <p/>

                            <label>
                                <input
                                    type='checkbox'
                                    {...register(`animals.${index}.hasNicknames` as 'animals.0.hasNicknames')}
                                    defaultChecked={field.hasNicknames}/>
                                <span>Has Nicknames?</span>
                            </label>

                            <AnimalField index={index} control={control} register={register}/>

                        </fieldset>
                    )
                })}
                <div className='toolbar'>
                    <button type='button' onClick={() => append({})}>
                        Add Animal
                    </button>
                </div>

                <div className='toolbar'>
                    <button type='submit'>Submit</button>
                </div>

                <pre style={{textAlign: 'left'}}>
                    {JSON.stringify(watchAllFields, null, 2)}
                </pre>
            </form>
        </div>
    );
}

export default App;
