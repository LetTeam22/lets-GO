import { Link } from 'react-router-dom'


export const Error = ()  => {

    return (
        <div >
            <Link to='/home'>
                    <button type='button'>RETURN TO HOME</button>
            </Link>
        </div>
    );
};