import React from 'react';

const paging = props => {
    return (
        <div className='paging'>
            <span
                className='paging__navigate btn'
                onClick={() => props.goToPage(1)}>
                Đầu
            </span>
            <span
                className={`paging__navigate btn ${props.page === 1 ? 'disabled' : ''}`}
                onClick={() => props.goToPage(props.page - 1)}>
                Trước
            </span>
            {
                props.max - props.page <= 0 && props.page >= 5 ?
                    <span
                        className='paging__navigate btn'
                        onClick={() => props.goToPage(props.page - 4)}>
                        {props.page - 4}
                    </span>
                    : null
            }
            {
                props.max - props.page <= 1 && props.page >= 4 ?
                    <span
                        className='paging__navigate btn'
                        onClick={() => props.goToPage(props.page - 3)}>
                        {props.page - 3}
                    </span>
                    : null
            }
            {
                props.page >= 3 ?
                    <span
                        className='paging__navigate btn'
                        onClick={() => props.goToPage(props.page - 2)}>
                        {props.page - 2}
                    </span>
                    : null
            }
            {
                props.page >= 2 ?
                    <span className='paging__navigate btn'
                        onClick={() => props.goToPage(props.page - 1)}>
                        {props.page - 1}
                    </span>
                    : null
            }
            <span className='paging__navigate paging__present-page btn'>{props.page}</span>
            {
                props.max - props.page >= 1 ?
                    <span
                        className='paging__navigate btn'
                        onClick={() => props.goToPage(props.page + 1)}>
                        {props.page + 1}
                    </span> : null}
            {
                props.max - props.page >= 2 ?
                    <span
                        className='paging__navigate btn'
                        onClick={() => props.goToPage(props.page + 2)}>
                        {props.page + 2}
                    </span> : null
            }
            {
                props.max - props.page >= 3 && props.page <= 2 ?
                    <span
                        className='paging__navigate btn'
                        onClick={() => props.goToPage(props.page + 3)}>
                        {props.page + 3}
                    </span> : null
            }
            {
                props.max - props.page >= 4 && props.page === 1 ?
                    <span className='paging__navigate btn'
                        onClick={() => props.goToPage(props.page + 4)}>
                        {props.page + 4}
                    </span> : null
            }
            <span
                className={`paging__navigate btn ${props.max === props.page ? 'disabled' : ''}`}
                onClick={() => props.goToPage(props.page + 1)}>
                Tiếp
            </span>
            <span
                className='paging__navigate btn'
                onClick={() => props.goToPage(props.max)}>
                Cuối
            </span>
        </div>
    )
}

export default paging;