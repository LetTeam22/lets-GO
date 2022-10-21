import React, { useState } from 'react'
import s from './CreditCards.module.css';
import visaIcon from '../../image/iconCards/visa.png';
import masterIcon from '../../image/iconCards/mastercard.png';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { BiCopy } from 'react-icons/bi';
import { FcCheckmark } from 'react-icons/fc';

const CreditCards = () => {

    const [visa, setVisa] = useState(false);
    const [master, setMaster] = useState(false);

    return (
        <div className={s.div}>
            <h1 className={s.title}>TARJETAS DE PRUEBA</h1>
            <div className={s.container}>
                <div className={s.cards}>
                    <div className={s.masterCard}>
                        <img alt='master' src={masterIcon} className={s.icon}></img>
                        <div className={s.divNumber}>
                            <input className={s.number} value='5031 7557 3453 0604' readOnly></input>
                            <CopyToClipboard text='5031 7557 3453 0604' onCopy={() => setMaster(true)}>
                                <button>
                                    {
                                        master 
                                        ? <FcCheckmark size='1.5rem' />
                                        : <BiCopy size='1.5rem' color='#e4e3e3'/>
                                    }
                                </button>
                            </CopyToClipboard>
                        </div>
                        <h4 className={s.name}>NOMBRE Y APELLIDO</h4>
                        <span className={s.spanName}>John Doe</span>
                        <h4 className={s.venc}>VENCIMIENTO</h4>
                        <span className={s.spanVenc}>11/25</span>
                        <h4 className={s.cod}>COD. SEGURIDAD</h4>
                        <span className={s.spanCod}>123</span>
                    </div>
                    <div className={s.visaCard}>
                        <img alt='visa' src={visaIcon} className={s.visaIcon}></img>
                        <div className={s.divNumber}>
                            <input className={s.number} value='4509 9535 6623 3704' readOnly></input>
                            <CopyToClipboard text='4509 9535 6623 3704' onCopy={() => setVisa(true)}>
                                <button>
                                    {
                                        visa 
                                        ? <FcCheckmark size='1.5rem' />
                                        : <BiCopy size='1.5rem' color='#e4e3e3'/>
                                    }
                                </button>
                            </CopyToClipboard>
                        </div>
                        <h4 className={s.name}>NOMBRE Y APELLIDO</h4>
                        <span className={s.spanName}>John Doe</span>
                        <h4 className={s.venc}>VENCIMIENTO</h4>
                        <span className={s.spanVenc}>11/25</span>
                        <h4 className={s.cod}>COD. SEGURIDAD</h4>
                        <span className={s.spanCod}>123</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreditCards;
