import React from "react";
import Link from "next/link";

interface LinkComponentProps {
  href: string;
}

const LinkComponent: React.FC<LinkComponentProps> = ({ children, href }) => {
  return (
    <div className="btn btn-effect">
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </div>
  );
};

export default LinkComponent;