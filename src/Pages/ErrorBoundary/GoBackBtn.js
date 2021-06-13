import React from 'react';
import { useHistory } from 'react-router-dom';

export default function GoBackBtn() {
    const history = useHistory();
    return (
        <p onClick={() => history.push('/login')}>Retornar a página inicial.</p>
    )
}