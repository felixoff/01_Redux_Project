import React from 'react'

import preloader from '../../../avatar/career_loading.gif'

let Preloader = (props) => {
    return (
    <div style={ {backgroundColor:'white'}}>
        <img src={preloader} />
    </div>)
}

export default Preloader;