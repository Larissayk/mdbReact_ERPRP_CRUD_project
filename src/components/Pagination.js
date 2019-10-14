import React, { Component } from "react";
import {
  MDBPagination,
  MDBPageItem,
  MDBPageNav,
  MDBCol,
  MDBRow,
  MDBContainer
} from "mdbreact";

const Pagination = props => {
  const pageLinks = [];

  for (let i = 1; i <= props.pages + 1; i++) {
    let active = props.currentPage == i ? "active" : "";

    pageLinks.push(
      <span
        className={`waves-effect ${active}`}
        key={i}
        onClick={() => props.nextPage(i)}
      >
        <a href="#">{i}</a>
      </span>
    );
  }
  return (
   

    <MDBRow>
      <MDBCol>
        <MDBPagination className="mb-5">
          <MDBPageItem disabled>
            <MDBPageNav aria-label="Previous">
              <span aria-hidden="true">Previous</span>
            </MDBPageNav>
          </MDBPageItem>
          <MDBPageItem active>
            <MDBPageNav>
              {pageLinks}
            </MDBPageNav>
          </MDBPageItem>
          <MDBPageItem>
            <MDBPageNav aria-label="Previous">
              <span aria-hidden="true">Next</span>
            </MDBPageNav>
          </MDBPageItem>
        </MDBPagination>
      </MDBCol>
    </MDBRow>
  );
};

export default Pagination;
