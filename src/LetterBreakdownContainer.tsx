//@ts-ignore
import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, FormHelperText } from '@material-ui/core';
const LetterBreakdownContainer = () => {

    const [currentJoke, setCurrentJoke ] = useState('');
    const [currentLetterList, setCurrentLetterList] = useState([]);

    const onTextChange = (e:any) => {
        setCurrentJoke(e.target.value);
    }


    useEffect(() => {

        let obj = stringToArrayWithCharacterCounts(currentJoke);
        let letters = Array.from(Object.keys(obj));
        let arr:any[] = [];
        letters.forEach((l) => {
            if (l !== ' '){
                arr.push({letter:l, count:obj[l]});
            }
        })
        //@ts-ignore
        arr = arr.sort((a,b) => a.letter.localeCompare(b.letter));
        //@ts-ignore
        setCurrentLetterList(arr);
    }, [currentJoke]);

    return (
        <>
        <form>
           <TextField 
            id="standard-basic" 
            label="Type in your joke here!!!"
            color="primary"
            onChange={onTextChange}
            style={{width:'80%', textAlign:'center'}}
            />
        </form>
        <h2>RESULTS</h2>
        <div>
            {
            //@ts-ignore
            currentLetterList.map((e) =>
            <div>
                <LetterBreakdownComponent {...e}/>
            </div>
            )
            }
        </div>
        </>
    );
}

export default LetterBreakdownContainer;

interface LetterBreakdownComponentProps {
    letter : string,
    count : string
}

interface LetterBreakdownListProps {
    list : {letter:string,count:string}[]
}

function LetterBreakdownList(props : LetterBreakdownListProps){
    return<>
        <FormControl component="fieldset" style={{margin:'auto'}}>
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
         {props.list.map((e : any, i : number)=> 
            <LetterBreakdownComponent 
                {...props.list[i]}
            />)} 
         
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>
    </>
}

function LetterBreakdownComponent(props : LetterBreakdownComponentProps){

    const [checked, setChecked] = useState(false);

    return <FormControlLabel
        control={<Checkbox checked={checked} onChange={(e : any) => 
        setChecked(e.target.checked)
        } name="key" />}
        label={`${props.letter} - ${props.count}`}
    />
}

function stringToArrayWithCharacterCounts(s : string) {
    //@ts-ignore
    let result = [...s].reduce((a : string, e : string) => { a[e] = a[e] ? a[e] + 1 : 1; return a }, {}); 
    return result;
}
