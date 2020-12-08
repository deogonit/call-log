import React, {Component} from 'react';

export default class Pagination extends Component {
    render() {
        let {postsPerPage, totalPosts, paginate, currentPage} = this.props;
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
            pageNumbers.push(i);
        }
        return (
            <nav>
                <ul className='pagination'>
                    {pageNumbers.map(number => (
                        <li key={number} className={currentPage === number ? 'page-item disabled' : 'page-item'}>
                            <a id={number} onClick={(event) => paginate(event, number)} href='!#' className='page-link'>
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
}