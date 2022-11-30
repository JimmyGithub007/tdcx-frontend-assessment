import { LoadContainer } from "../../styles";

const Loader = () => {
    return (<LoadContainer>
        <div className='container'>
            <span className='circle'></span>
            <span className='circle'></span>
            <span className='circle'></span>
            <span className='circle'></span>
        </div>
    </LoadContainer>);
}

export default Loader;