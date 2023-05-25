import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <div className="layout">{props.children}</div>
    <style jsx global>{`
      html {
        box-sizing: border-box;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
          "Segoe UI Symbol";
        background: rgba(0, 0, 0, 0.05);
      }

      input,
      textarea {
        font-size: 16px;
      }

      button {
        cursor: pointer;
      }

      .form {
        display: flex;
        margin: 0 auto;
        flex-direction: column;
      }

      .form div {
        display: flex;
        flex-direction: column;
        width: 500px;
        margin: .1rem 0rem;
      }

      .error-message {
        color: red;
        pad
      }

      button {
        margin: .5rem 0rem;
      }

      p {
        margin: .1rem 0rem;
      }

      .layout {
        padding: 0 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .page {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .quote {
        position: fixed;
        top: 2rem;
        right: 2rem;
        top
      }

      .border {
        border: 1px solid black;
        padding: 0.1rem;
      }
    `}</style>
  </div>
);

export default Layout;
