import React , {useState} from 'react'
import styles from './Paginator.module.css';
import cn from "classnames";

let Paginator = ({totalItemsCount, pageSize, currentPage, onPageChange,portionSize = 10}) =>
{
    let pagesCount = Math.ceil(totalItemsCount/pageSize);

    let pages = [];
    for (let i= 1; i<=pagesCount; i++) {
            pages.push(i);
    }
    let portionsCount = Math.ceil(pagesCount/portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftEnd = (portionNumber -1) * portionSize +1;
    let rightEnd = portionNumber * portionSize ;
    return <div className={styles.paginator}>
        {portionNumber > 1 &&
        <button onClick={() => {setPortionNumber(portionNumber-1)}}>PREW</button>}
            {pages.filter(p=> p >= leftEnd && p <= rightEnd)
                .map((p)  => {
            return <span className = {cn({[styles.selectPage]:currentPage === p}, styles.pageNumber)} key={p}
                            onClick={(e)=>{onPageChange(p)}}>{p}</span>
        })}
        {portionsCount > portionNumber &&
        <button onClick={() =>{setPortionNumber(portionNumber + 1)}}>NEXT</button>}
        </div>
};

export default Paginator;