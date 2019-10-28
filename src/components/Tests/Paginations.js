import React from 'react';
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";


const Paginations = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i=1; i<= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        // <nav>
        //     <ul>
        //         {pageNumbers.map(number => (
        //             <li key={number}>
        //                 <a href="!#">
        //                     {number}
        //                 </a>
        //             </li>
        //         ))}
        //     </ul>
        // </nav>
        <MDBPagination color="blue">
            <MDBPageItem >
                <MDBPageNav className="page-link">
                    <span>First</span>
                </MDBPageNav>
            </MDBPageItem>  
            <MDBPageItem disabled>
                <MDBPageNav className="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                </MDBPageNav>
            </MDBPageItem>
            <MDBPageItem>
                <MDBPageNav className="page-link">
                    {pageNumbers.map(number => (
                        <span key={number} 
                            onClick={() => paginate(number)} className="mx-2 my-2">
                                {number}
                            
                        </span>
                    ))}
                    
                </MDBPageNav>
            </MDBPageItem>

            <MDBPageItem>
                <MDBPageNav >
                   &raquo;
                </MDBPageNav>
            </MDBPageItem>
            <MDBPageItem>
                <MDBPageNav className="page-link">
                    <span>Last</span>
                </MDBPageNav>
            </MDBPageItem>
        </MDBPagination>
        
    );
}

export default Paginations;

