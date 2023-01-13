import '../App.css'

export default function Die(props){
    const style = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return(
        <div onClick={props.holdDice} className='die' style={style}>
            <h2 className='die-num'>{props.number}</h2>
        </div>
    )
}