import {useState} from 'react';
import './App.css';
import {useForm} from 'react-hook-form'
import {v4} from 'uuid';

function App() {
    const defaultValues = {
        [v4()]: 'A',
        [v4()]: 'B',
        [v4()]: 'C',
    }

    const [data, setData] = useState(defaultValues)
    const {register, handleSubmit} = useForm({defaultValues});

    const onSubmit = (data) => {
        console.log(data); // Return all the fields, even the deleted ones
    }

    const deleteField = (key) => {
        setData(
            Object.fromEntries(
                Object
                    .entries(data)
                    .filter(item => item[0] !== key)
            )
        )
    }

    return (
        <div className='App'>
            <form onSubmit={handleSubmit(onSubmit)}>
                {Object.entries(data).map((item) => {
                    const key = item[0];
                    const value = item[1];

                    return (
                        <p key={key}>
                            <input name={key} defaultValue={value} {...register} />
                            <button type='button' onClick={() => deleteField(key)}>
                                Remove
                            </button>
                        </p>
                    )
                })}

                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default App;
