import React from "react";
import Link from "next/link";

type LinkComponentProps = React.HTMLAttributes<HTMLDivElement> & {
  href: string;
};

const LinkComponent: React.FC<LinkComponentProps> = ({
  children,
  href,
  className,
}) => {
  return (
    <div className={className}>
      <div className="btn btn-effect">
        <Link href={href}>
          <a>{children}</a>
        </Link>
      </div>
    </div>
  );
};

export default LinkComponent;
