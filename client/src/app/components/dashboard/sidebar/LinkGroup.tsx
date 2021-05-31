import React from "react";

interface Props {
  name: string;
  children: JSX.Element;
  button?: JSX.Element;
}
export const LinkGroup = ({ name, children, button }: Props) => {
  return (
    <>
      <div className="pt-3">
        <a
          className="btn btn-primary"
          style={{ fontSize: "1.3em" }}
          data-bs-toggle="collapse"
          href={`#${name}`}
        >
          {name}
        </a>
        {button}
      </div>
      <ul className="ps-1 collapse show" id={name}>
        {children}
      </ul>
    </>
  );
};
