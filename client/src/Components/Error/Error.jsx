import { Link } from 'react-router-dom';
import { NotFound } from '../NotFound/NotFound'
import s from './Error.module.css'

export const Error = () => {

    return (
        <div>
            <Link to='/home'>
                <button type='button' className={s.btnHome}>RETURN TO HOME</button>
            </Link>
            <div className={s.background}>
                <div className={s.imgContainer}>
                    <NotFound />
                </div>
            </div>
        </div>
    );
};