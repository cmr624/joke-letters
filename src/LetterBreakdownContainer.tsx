//@ts-ignore
import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
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
            style={{width:'400px'}}
            />
        </form>
        <h2>RESULTS</h2>
        <ul>
            {
            //@ts-ignore
            currentLetterList.map((e) => <li>{e.letter} = {e.count}</li>)
            }
        </ul>
        </>
    );
}

export default LetterBreakdownContainer;

function stringToArrayWithCharacterCounts(s : string) {
    //@ts-ignore
    let result = [...s].reduce((a : string, e : string) => { a[e] = a[e] ? a[e] + 1 : 1; return a }, {}); 
    console.log(result);
    return result;
}
