import React, { useEffect, useRef, useState } from 'react';

function Footer(props) {
  const { container, firstPage, lastPage, currentPage, setCurrentPage } = props;
  const [prevPage, setPrevPage] = useState(currentPage - 1);
  const [nextPage, setNextPage] = useState(currentPage + 1);

  useEffect(
    () => {
      setPrevPage(currentPage - 1);
      setNextPage(currentPage + 1);
    },
    [currentPage]
  );

  return (
    <footer className={container}>
      <nav aria-label="Pagination">
        <ul className="pagination justify-content-center">
          <NavButton
            title={"Previous"}
            condition={currentPage === firstPage || lastPage <= firstPage}
            page={prevPage}
            setCurrentPage={setCurrentPage}
          />
          <NavButton
            title={"Next"}
            condition={currentPage === lastPage || lastPage <= firstPage}
            page={nextPage}
            setCurrentPage={setCurrentPage}
          />
        </ul>
      </nav>
    </footer>
  )
}

const navButtonsRef = {};

function NavButton(props) {
  const { title, condition, page, setCurrentPage } = props;

  navButtonsRef[title] = useRef();
  const neighborButton = Object.keys(navButtonsRef).find(key => key !== title);

  const attributes = {
    className: "page-link",
    href: `./?page=${!condition && page}`,
    onClick: (event) => { event.preventDefault(); setCurrentPage(page); },
    ref: navButtonsRef[title],
  };

  if (condition) {
    attributes.tabIndex = "-1";
    attributes["aria-disabled"] = "true";
    neighborButton && navButtonsRef[neighborButton].current && navButtonsRef[neighborButton].current.focus();
  }

  return (
    <li className={"page-item" + (condition ? " disabled" : "")}>
      <a {...attributes}>{title}</a>
    </li>
  )
}

export default Footer;
